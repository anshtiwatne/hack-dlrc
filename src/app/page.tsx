'use client';

import './globals.css';
import Image from 'next/image';
import qs from 'qs';
import axios, { AxiosError } from 'axios';
import { JetBrains_Mono } from 'next/font/google';
import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { error } from 'console';
import { json } from 'stream/consumers';

const firebaseConfig = {
  apiKey: 'AIzaSyCBHUFCh8uhn1vIW3b9EpQV7qAzAEHT2Oo',
  authDomain: 'hack-dlrc.firebaseapp.com',
  projectId: 'hack-dlrc',
  storageBucket: 'hack-dlrc.appspot.com',
  messagingSenderId: '331587865815',
  appId: '1:331587865815:web:d8dd1daef0c3d1ceceb492',
  measurementId: 'G-KZZ2TZ0JZQ',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

type problemData = {
  title: string;
  points: number;
  description: string;
  positiveData: Array<string>;
  additionalInfo: Array<string>;
  resources: Array<Object>;
  input: Array<string>;
  output: Array<string>;
};

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });


function QuestionNav({ number }: { number: number }) {
  const [btnNum, questionClicked] = useState(1);
  function handleClick(btnNum: number) {
    questionClicked(btnNum);
  }

  const [isLoading, setLoading] = useState(true);
  const [questionData, setData] = useState<problemData | null | undefined>(undefined);
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'problems', btnNum.toString());
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data() as problemData | undefined;
      setData(docData);
      setLoading(false);
    }
    fetchData();
  }, [btnNum]);

  const questions = Array.from({ length: number }, (_, i) => i + 1);
  return (
    <div className="flex min-h-full justify-between">
      <div>
        <nav className="mb-2 flex justify-center py-2 text-zinc-700">
          {questions.map((questionNum) => (
            <button
              key={questionNum}
              onClick={() => {
                handleClick(questionNum);
              }}
              className={`mx-2 h-8 w-8 rounded-md border ${
                btnNum === questionNum
                  ? 'bg-blue-600 text-neutral-50'
                  : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              {questionNum}
            </button>
          ))}
        </nav>
        <Question questionNum={btnNum} questionData={questionData} isLoading={isLoading} />
      </div>
      <IDE questionNum={btnNum} questionData={questionData} isLoading={isLoading}/>
    </div>
  );
}

function formattedText(text: string) {
  const newText = text.replace(
    /\`(.*?)\`/g,
    (match, content) => '<span class="font-bold">' + content + '</span>',
  );

  return <span dangerouslySetInnerHTML={{ __html: newText }}></span>;
}

function Question({ questionNum, questionData, isLoading }: { questionNum: number, questionData: problemData | null | undefined, isLoading: boolean }) {
  
  if (isLoading) return <p className="mr-2 w-[50vw]">Loading...</p>;
  if (!questionData) return <p className="mr-2 w-[50vw]">No question data</p>;

  return (
    <div className="mr-2 w-[50vw]">
      <div className="text-xl font-medium text-gray-800">
        {questionData.title} ({questionData.points}pts)
      </div>
      <div className="py-4 text-gray-900">
        {formattedText(questionData.description)}
      </div>
      <div className="text-xl font-medium text-gray-800">Examples</div>
      <div className="py-4 text-gray-900">
        {questionData.positiveData.map((data, index) => (
          <div key={index}>
            {index + 1}. {formattedText(data)}
          </div>
        ))}
      </div>
      <div className="text-xl font-medium text-gray-800">Additional Info</div>
      <div className="py-4 text-gray-900">
        {questionData.additionalInfo.map((data, index) => (
          <div key={index}>
            {index + 1}. {formattedText(data)}
          </div>
        ))}
      </div>
      <div className="text-xl font-medium text-gray-800">Resources</div>
      <div className="py-4 text-blue-600">
        {questionData.resources.map((link, index) => (
          <a key={index} href={Object.entries(link)[0][1]}>
            {Object.entries(link)[0][0]}
          </a>
        ))}
      </div>
    </div>
  );
}

type languagesObject = {
  [key: string]: {
    display: string;
    monaco: string;
    codex: string;
    helloWorld: string;
  };
};

const languages: languagesObject = {
  java: {
    display: 'Java',
    monaco: 'java',
    codex: 'java',
    helloWorld:
      'class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, HackDLRC");\n    }\n}',
  },
  python: {
    display: 'Python',
    monaco: 'python',
    codex: 'py',
    helloWorld: 'print("Hello, HackDLRC")',
  },
  cpp: {
    display: 'C++',
    monaco: 'cpp',
    codex: 'cpp',
    helloWorld:
      '#include <iostream>\n\nint main() {\n    std::cout << "Hello, HackDLRC";\n}',
  },
  c: {
    display: 'C',
    monaco: 'c',
    codex: 'c',
    helloWorld:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello, HackDLRC");\n}',
  },
  go: {
    display: 'Go',
    monaco: 'go',
    codex: 'go',
    helloWorld:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, HackDLRC")\n}',
  },
  cs: {
    display: 'C#',
    monaco: 'csharp',
    codex: 'cs',
    helloWorld:
      'using System;\n\npublic class Program\n{\n    public static void Main()\n    {\n        Console.WriteLine("Hello, HackDLRC");\n    }\n}',
  },
  js: {
    display: 'JavaScript',
    monaco: 'javascript',
    codex: 'js',
    helloWorld: 'console.log("Hello, HackDLRC")',
  },
  other: {
    display: 'Other',
    monaco: 'plaintext',
    codex: 'null',
    helloWorld: 'your language here\n\nyour code here',
  },
};

function runCode(code: string, lang: string, stdin: string) {
  let data = qs.stringify({
    code: code,
    language: lang,
    input: stdin,
  });

  let config = {
    method: 'post',
    url: 'https://api.codex.jaagrav.in',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  return new Promise((resolve) => {
    if (code === '' || lang === 'null') {
      resolve(['', ''])
    }
    else {
      axios(config).then(function (response) {
        resolve([response.data.output, response.data.error])
        console.log(response.data)
      }).catch(AxiosError => {
        resolve(['', AxiosError.message])
      });
    }
  })
}

function IDE({ questionNum, questionData, isLoading }: { questionNum: number, questionData: problemData | null | undefined, isLoading: boolean }) {
  const [lang, setLang] = useState(languages.java);

  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    setLang(languages[selectedLang]);
  };

  const editorRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  };

  function inputDidMount(editor: any) {
    inputRef.current = editor;
  }

  const [response, setResponse] = useState<string>('');

  async function handleClick() {
    setResponse('Running...');
    const editorValue = editorRef.current?.getValue();
    // const input = questionData?.input?.join('\n') ?? '';
    const input = inputRef.current?.getValue();
    const apiResponse: [string, string] = await runCode(editorValue, lang.codex, input) as [string, string];
    setResponse(apiResponse[0] + apiResponse[1]);
  };

  return (
    <div className="mb-4 ml-2 flex w-[50vw] flex-col rounded-lg bg-[#1E1E1E] text-neutral-50">
      <div className="m-2">
        <select
          className="mr-2 rounded-md bg-neutral-700 p-1"
          name="language"
          id="lang"
          onChange={handleLangChange}
        >
          {Object.keys(languages).map((key) => (
            <option key={key} value={key}>
              {languages[key].display}
            </option>
          ))}
        </select>

        <button
          className={`rounded-md bg-neutral-700 p-1 ${
            lang.codex === 'null' ? 'hidden' : ''
          }`}
          onClick={handleClick}
        >
          ▶ Run
        </button>
      </div>

      <hr className="border-neutral-700" />

      <div className="mt-4">
        <Editor
          height="62vh"
          theme="vs-dark"
          language={lang.monaco}
          value={lang.helloWorld}
          options={{
            fontSize: 14,
            fontFamily: 'JetBrains Mono',
            fontLigatures: true,
            minimap: { enabled: false },
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden',
            },
            overviewRulerLanes: 0,
          }}
          onMount={handleEditorDidMount}
        />
      </div>
      <hr className="border-neutral-700" />
      <div className='flex justify-between mt-2'>
        <div className='inline-block w-1/2'>
          <div className='mx-8 mb-2 font-light text-sm text-neutral-200'>INPUT</div>
          <Editor className='pl-1'
            height="18vh"
            theme="vs-dark"
            language="plaintext"
            options={{
              fontSize: 14,
              fontFamily: 'JetBrains Mono',
              fontLigatures: true,
              minimap: { enabled: false },
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
              },
              overviewRulerLanes: 0,
              cursorStyle: 'block',
              lineNumbers: 'off',
            }}
            onMount={inputDidMount}
          />
        </div>
        <div className='inline-block w-1/2'>
        <div className='mx-8 mb-2 font-light text-sm text-neutral-200'>OUTPUT</div>
          <Editor className='pl-1 pr-5'
            height="18vh"
            theme="vs-dark"
            language="plaintext"
            value={response}
            options={{
              fontSize: 14,
              fontFamily: 'JetBrains Mono',
              fontLigatures: true,
              minimap: { enabled: false },
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
              },
              overviewRulerLanes: 0,
              readOnly: true,
              domReadOnly: true,
              lineNumbers: 'off',
              renderLineHighlight: 'none',
              renderWhitespace: 'none',
              guides: { indentation: false },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <QuestionNav number={10} />
    </main>
  );
}
