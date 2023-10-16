'use client';

import './globals.css';
import Image from 'next/image';
import qs from 'qs';
import axios from 'axios';
import { JetBrains_Mono } from 'next/font/google';
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
  negativeData: Array<string>;
  additionalInfo: Array<string>;
  resources: Array<Object>;
};

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

let questionNumber = 1;

function QuestionNav({ number }: { number: number }) {
  const [btnNum, questionClicked] = useState(1);
  function handleClick(btnNum: number) {
    questionClicked(btnNum);
    questionNumber = btnNum;
  }

  const questions = Array.from({ length: number }, (_, i) => i + 1);
  return (
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
      <Question questionNum={btnNum} />
    </div>
  );
}

function Question({ questionNum }: { questionNum: number }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<problemData | null | undefined>(undefined);
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

  if (isLoading) return <p className="mr-2 w-[50vw]">Loading...</p>;
  if (!data) return <p className="mr-2 w-[50vw]">No question data</p>;

  return (
    <div className="mr-2 w-[50vw]">
      <div className="text-xl font-medium text-gray-800">
        {data.title} ({data.points}pts)
      </div>
      <div className="py-4 text-gray-900">{data.description}</div>
      <div className="text-xl font-medium text-gray-800">Positive Data</div>
      <div className="py-4 text-gray-900">
        {data.positiveData.map((data, index) => (
          <div key={index}>
            {index + 1}. {data}
          </div>
        ))}
      </div>
      <div className="text-xl font-medium text-gray-800">Negative Data</div>
      <div className="py-4 text-gray-900">
        {data.negativeData.map((data, index) => (
          <div key={index}>
            {index + 1}. {data}
          </div>
        ))}
      </div>
      <div className="text-xl font-medium text-gray-800">Additional Info</div>
      <div className="py-4 text-gray-900">
        {data.additionalInfo.map((data, index) => (
          <div key={index}>
            {index + 1}. {data}
          </div>
        ))}
      </div>
      <div className="text-xl font-medium text-gray-800">Resources</div>
      <div className="py-4 text-blue-600">
        {data.resources.map((link, index) => (
          <a key={index} href={Object.entries(link)[0][1]}>{Object.entries(link)[0][0]}</a>
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
  java: {display: 'Java', monaco: 'java', codex: 'java', helloWorld: 'class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, HackDLRC");\n    }\n}'},
  python: {display: 'Python', monaco: 'python', codex: 'py', helloWorld: 'print("Hello, HackDLRC")'},
  cpp: {display: 'C++', monaco: 'cpp', codex: 'cpp', helloWorld: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, HackDLRC";\n}'},
  c: {display: 'C', monaco:'c', codex: 'c', helloWorld: '#include <stdio.h>\n\nint main() {\n    printf("Hello, HackDLRC");\n}'},
  go: {display: 'Go', monaco: 'go', codex:'go', helloWorld: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, HackDLRC")\n}'},
  cs: {display: 'C#', monaco: 'csharp', codex:'cs', helloWorld: 'using System;\n\npublic class Program\n{\n    public static void Main()\n    {\n        Console.WriteLine("Hello, HackDLRC");\n    }\n}'},
  js: {display: 'JavaScript', monaco: 'javascript', codex: 'js', helloWorld: 'console.log("Hello, HackDLRC")'},
}

function codexAPI(code: string, lang: string, stdin:string) {
  let data = qs.stringify({
    code: code,
    language: lang,
    input: stdin,
  });

  let config = {
    method: "post",
    url: "https://api.codex.jaagrav.in",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config).then(function (response) {
    console.log(response.data.output);
  });
}

function IDE() {
  const [lang, setLang] = useState(languages.java);

  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    setLang(languages[selectedLang]);
  }

  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleClick = () => {
    const editorValue = editorRef.current?.getValue();
    const output = codexAPI(editorValue, lang.codex, "");
  };

  return (
    <div className="ml-2 w-[50vw] mb-4 bg-[#1E1E1E] rounded-lg text-neutral-50 flex flex-col">
      <div className='m-2'>
        <select className='bg-neutral-700 rounded-md p-1 mr-2' name="language" id="lang" onChange={handleLangChange}>
          {Object.keys(languages).map((key) => (
            <option key={key} value={key}>{languages[key].display}</option>
          ))}
        </select>

        <button className='bg-neutral-700 p-1 rounded-md' onClick={handleClick}>▶ Run (open console)</button>
      </div>

      <hr className='border-neutral-700' />
      
      <div className='m-2 pt-2'>
        <Editor
          height="100vh"
          theme="vs-dark"
          language={lang.monaco}
          value={lang.helloWorld}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <div className="flex min-h-full justify-between">
        <QuestionNav number={10} />
        <IDE />
      </div>
    </main>
  );
}
