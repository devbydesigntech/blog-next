import Link from 'next/link';

export default function Home({ posts }) {
  // console.log( posts );
  return (
    <div>

    {/* loop over the posts and show them */}
    
      {posts && posts.data.map((post) => (
        <Link href={`/${post.attributes.slug}`} key={post.id}>
        <a >
          <h2>{post.attributes.title}</h2>
          <p>{post.attributes.content}</p>
          <p>{post.attributes.user.data.attributes.username}</p>
        </a>
        </Link>
      ))}

    </div>
  )
}

export async function getStaticProps() {
  // get posts from api
  const res = await fetch('http://localhost:1337/api/posts?populate=*');
  const posts = await res.json();

  console.log(posts);
  return {
    props: { posts },
  };
}