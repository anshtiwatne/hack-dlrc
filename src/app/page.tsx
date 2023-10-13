import Image from "next/image";
import Script from 'next/script'

function QuestionNav() {
  return (
    <nav className="flex justify-center text-zinc-700">
      <button className="mx-2 h-8 w-8 rounded-md border bg-blue-600 text-neutral-50">
        1
      </button>
      <button className="mx-2 h-8 w-8 rounded-md border bg-slate-50">2</button>
      <button className="mx-2 h-8 w-8 rounded-md border bg-slate-50">3</button>
      <button className="mx-2 h-8 w-8 rounded-md border bg-slate-50">4</button>
      <button className="mx-2 h-8 w-8 rounded-md border bg-slate-50">5</button>
      <button className="mx-2 h-8 w-8 rounded-md border bg-slate-50">6</button>
      <button className="mx-2 h-8 w-8 rounded-md border bg-slate-50">7</button>
      <button className="mx-2 h-8 w-8 rounded-md border bg-slate-50">8</button>
      <button className="mx-2 h-8 w-8 rounded-md border bg-slate-50">9</button>
      <button className="mx-2 h-8 w-8 rounded-md border bg-slate-50">10</button>
    </nav>
  );
}

function Question() {
  return (
    <div className="w-[50vw] mr-2">
      <div className="text-xl font-medium text-gray-800">Description</div>
      <div className="py-4 text-gray-900">
        Sachin Sir is teaching students how binary numbers work. He wants the
        students to cross check their answers with a calculator but is worried
        using one on the internet will distract the students. He decides to make
        a simple program that will accept a binary number string like{" "}
        <b>0001 0111</b> and convert it to the corresponding denary number, in
        this case - <b>23.</b>
      </div>
      <div className="text-xl font-medium text-gray-800">Positive Data</div>
      <div className="py-4 text-gray-900">
        1. <b>0000 0000</b> should result in <b>0</b>
        <br />
        2. <b>1</b> should result in <b>1</b>
        <br />
        3. <b>1 1 1 1</b> should result in <b>15</b>
      </div>
      <div className="text-xl font-medium text-gray-800">Negative Data</div>
      <div className="py-4 text-gray-900">
        1. <b>ABCD</b> should result in an error
        <br />
        2. <b>123</b> should result in an error
        <br />
        3. <b>-1001</b> should result in an error
      </div>
      <div className="text-xl font-medium text-gray-800">Additional Information</div>
      <div className="py-4 text-gray-900">
        1. A valid binary string is one that contains the characters <b>0</b>, <b>1</b> or <b>" "</b> (whitespace). Your algorithm may be tested against invalid strings.
        <br />
        2. Spaces are to be ignored, meaning <b>1001</b> is equivalent to <b>1 0 0 1</b>
      </div>
      <div className="text-xl font-medium text-gray-800">Resources</div>
      <div className="py-4 text-blue-700">
        <a href="https://en.wikibooks.org/wiki/Wikijunior:How_Things_Work/Binary_Numbers#:~:text=All%20the%20numbers%20are%20constructed,in%20the%20form%20of%20bits.">WikiBooks</a>
      </div>
    </div>
  );
}

function IDEEmbed() {
  return (
    <div className="w-[50vw] ml-2">
      <div data-pym-src="https://www.jdoodle.com/iembed/v0/Oom?arg=0"></div>
      <Script src="https://www.jdoodle.com/assets/jdoodle-pym.min.js" type="text/javascript"></Script>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <QuestionNav />
      <div className="flex py-2">
        <Question />
        <IDEEmbed />
      </div>
    </div>
  );
}
