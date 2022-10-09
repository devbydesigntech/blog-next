import Link from 'next/link';

export default function Post({ post }) {
    // console.log(post);
    return (
        <div>
            <Link href="/"><a>Go Home</a></Link>
            <h2>
                {post && post.data[0].attributes.title}
            </h2>
        </div>
    )
}

// tell next.js how many pages there are
export async function getStaticPaths() {
    const res = await fetch('https://jellyfish-app-6bigs.ondigitalocean.app/api/posts')
    const posts = await res.json();
    // console.log(posts.data[0].attributes.slug)
    const paths = posts.data.map((post) => ({
        params: { slug: post.attributes.slug},
    }))

    return {
        paths,
        fallback: true
    }
}

//for each individual page: get the data for that page
export async function getStaticProps({ params }) {
    // const { slug } = params;

    const res = await fetch(`https://jellyfish-app-6bigs.ondigitalocean.app/api/posts?filters[slug]=${params.slug}`)
    const post = await res.json();
    // console.log(post)

    return {
        props: { post }
    }
}