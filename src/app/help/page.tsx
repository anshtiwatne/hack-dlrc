import Link from "next/link"

export default function Home() {
    return (
      <main className="">
        <Link href={"mailto:ansh.tiwatne@gmail.com"}>Write to us</Link>
        <br />
        <Link href={""}>Call us</Link>
      </main>
    )
  }
  