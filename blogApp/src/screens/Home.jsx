import Hero from "../components/Hero"
import PostList from "../components/PostList"
import ViewAll from "../components/ViewAll"

const Home = () => {
  return (
    <div>
        <Hero />
        <PostList isHome={true} />
        <ViewAll /> 
    </div>
  )
}

export default Home