'use client';
import './globals.css';
import qs from 'qs';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
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

function formattedText(text: string) {
  const newText = text.replace(
    /\`(.*?)\`/g,
    (match, content) => '<span class="font-bold">' + content + '</span>',
  );

  return <span dangerouslySetInnerHTML={{ __html: newText }}></span>;
}

function Main() {
  const [selectedQuestion, setQuestion] = useState(1);

  function QuestionNav({ totalQuestions, selected }: { totalQuestions: number, selected: number }) {
    const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);
    return (
      <nav className='mb-2 flex justify-center py-2 text-zinc-700'>
        {questions.map((questionNum) => (
          <button
            key={questionNum}
            onClick={() => setQuestion(questionNum)}
            className={`mx-2 h-8 w-8 rounded-md border ${selectedQuestion === questionNum ? 'bg-blue-600 text-neutral-50' : 'bg-slate-50 hover:bg-slate-100'}`}
            >
            {questionNum}
          </button>
        ))}
      </nav>
    )
  }

  function Question( { questionNum }: { questionNum: number }) {
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
      <div className='mr-2 w-[50vw]'>
        <div className="text-xl font-medium text-gray-800">{data.title} ({data.points}pts)</div>
        <div className="py-4 text-gray-900">{formattedText(data.description)}</div>
        <div className="text-xl font-medium text-gray-800">Examples</div>
        <div className="py-4 text-gray-900">
          {data.positiveData.map((data, index) => (
            <div key={index}>
              {index + 1}. {formattedText(data)}
            </div>
          ))}
        </div>
        <div className="text-xl font-medium text-gray-800">Additional Info</div>
        <div className="py-4 text-gray-900">
          {data.additionalInfo.map((data, index) => (
            <div key={index}>
              {index + 1}. {formattedText(data)}
            </div>
          ))}
        </div>
        <div className="text-xl font-medium text-gray-800">Resources</div>
        <div className="py-4 text-blue-600">
          {data.resources.map((link, index) => (
            <a key={index} href={Object.entries(link)[0][1]}>
              {Object.entries(link)[0][0]}
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <main>
      <div>
        <QuestionNav totalQuestions={10} selected={1} />
        <Question questionNum={selectedQuestion} />
      </div>
    </main>
  )
}

export default function Home() {
  
  return (
    <Main />
  )
}