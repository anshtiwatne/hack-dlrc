'use client';

import './globals.css';
// import Image from 'next/image';
import qs from 'qs';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore, getDoc, doc } from 'firebase/firestore';

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

type languagesObject = {
  [key: string]: {
    display: string;
    monaco: string;
    codex: string;
    helloWorld: string;
  };
};

function QuestionNav({ number: totalQuestions }: { number: number }) {
  const [questionNum, setQuestionNum] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [questionData, setData] = useState<problemData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'problems', questionNum.toString());
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data() as problemData | undefined;
      setData(docData);
      setLoading(false);
    }
    fetchData();
  }, [questionNum]);

  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className="flex h-full flex-col">
      <nav className="flex justify-center pb-2 pt-4 text-zinc-700">
        {questions.map((btnNum) => (
          <button
            key={btnNum}
            onClick={() => setQuestionNum(btnNum)}
            className={`mx-2 h-8 w-8 rounded-md border ${
              btnNum === questionNum
                ? 'bg-blue-600 text-neutral-50'
                : 'bg-slate-50 hover:bg-slate-100'
            }`}
          >
            {btnNum}
          </button>
        ))}
      </nav>
      {/* some sort of bug: flex-grow is only working if any random height is set */}
      <div className="h-1 flex-grow overflow-auto p-4 pt-0">
        <Question questionData={questionData} isLoading={isLoading} />
      </div>
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

function Question({
  questionData,
  isLoading,
}: {
  questionData: problemData | null | undefined;
  isLoading: boolean;
}) {
  if (isLoading) return <p className="mr-2 w-[50vw]">Loading...</p>;
  if (!questionData) return <p className="mr-2 w-[50vw]">No question data</p>;

  let resources = <div></div>

  if (questionData.resources !== undefined) {
    resources = (
      <div className="py-4 text-blue-600">
        {questionData.resources.map((link, index) => (
          <a key={index} href={Object.entries(link)[0][1]}>
            {Object.entries(link)[0][0]}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div>
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
      <div
        className={`text-xl font-medium text-gray-800 ${
          questionData.resources == undefined ? 'hidden' : ''
        }`}
      >
        Resources
      </div>
      {resources}
    </div>
  );
}

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
      resolve(['', '']);
    } else {
      axios(config)
        .then(function (response) {
          resolve([response.data.output, response.data.error]);
          console.log(response.data);
        })
        .catch((AxiosError) => {
          resolve(['', AxiosError.message]);
        });
    }
  });
}

function IDE() {
  const [lang, setLang] = useState(languages.java);

  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    setLang(languages[selectedLang]);
  };

  const editorRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  function inputDidMount(editor: any) {
    inputRef.current = editor;
  }

  const [response, setResponse] = useState<string>('');

  async function handleClick() {
    setResponse('Running...');
    const editorValue = editorRef.current?.getValue();
    // const input = questionData?.input?.join('\n') ?? '';
    const input = inputRef.current?.getValue();
    const apiResponse: [string, string] = (await runCode(
      editorValue,
      lang.codex,
      input,
    )) as [string, string];
    setResponse(apiResponse[0] + apiResponse[1]);
  }

  return (
    <div className="flex h-full flex-col bg-[#1E1E1E] text-neutral-50 rounded-sm">
      <div>
        <select
          className="m-2 rounded-md bg-neutral-700 p-1 outline-none"
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
          className={`m-2 ml-0 rounded-md bg-neutral-700 p-1 py-[0.15rem] ${
            lang.codex === 'null' ? 'hidden' : ''
          }`}
          onClick={handleClick}
        >
          ▶ Run
        </button>

        <hr className="border-neutral-700" />
      </div>

      <div className="flex flex-grow flex-col">
        <div className="inline-block h-[75%] w-full pt-2">
          <Editor
            theme="vs-dark"
            language={lang.monaco}
            value={lang.helloWorld}
            options={{
              fontSize: 14,
              fontFamily: 'JetBrains Mono',
              fontLigatures: true,
              minimap: { enabled: false },
              scrollbar: {
                horizontalScrollbarSize: 5,
                verticalScrollbarSize: 5,
              },
              overviewRulerLanes: 0,
            }}
            onMount={handleEditorDidMount}
          />
          <hr
            className={`border-neutral-700 ${
              lang.codex === 'null' ? 'hidden' : ''
            }`}
          />
        </div>
        <div
          className={`flex w-full flex-grow ${
            lang.codex === 'null' ? 'hidden' : ''
          }`}
        >
          <div className="inline-block w-1/2">
            <div className="mx-7 mb-1 mt-2 text-sm font-light text-neutral-200">
              INPUT
            </div>
            <Editor
              className="pl-1 pr-4"
              height="15vh"
              theme="vs-dark"
              language="plaintext"
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono',
                fontLigatures: true,
                minimap: { enabled: false },
                scrollbar: {
                  horizontalScrollbarSize: 5,
                  verticalScrollbarSize: 5,
                  useShadows: false,
                },
                overviewRulerLanes: 0,
                cursorStyle: 'block',
                lineNumbers: 'off',
                renderLineHighlight: 'none',
              }}
              onMount={inputDidMount}
            />
          </div>

          <div
            className={`my-2 border border-neutral-700 ${
              lang.codex === 'null' ? 'hidden' : ''
            }`}
          />

          <div className="inline-block w-1/2">
            <div className="mx-6 mb-1 mt-2 text-sm font-light text-neutral-200">
              OUTPUT
            </div>
            <Editor
              className="pr-1"
              height="15vh"
              theme="vs-dark"
              language="plaintext"
              value={response}
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono',
                fontLigatures: true,
                minimap: { enabled: false },
                scrollbar: {
                  horizontalScrollbarSize: 5,
                  verticalScrollbarSize: 5,
                  useShadows: false,
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
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-grow justify-between">
      <div className="inline-block w-[55%]">
        <QuestionNav number={10} />
      </div>
      <div className="inline-block w-[45%]">
        <IDE />
      </div>
    </main>
  );
}
