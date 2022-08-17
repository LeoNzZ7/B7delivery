import Link from "next/link";

const Home = () => {
  return(
    <div>
      <h1>Projeto B7delivery</h1>
      <Link href="/b7burger">B7burger</Link>
      <Link href="/b7pizza">B7pizza</Link>
    </div>
  )
}

export default Home;