import Head from 'next/head';
import Image from 'next/image';
import Header from '@/Components/Layout/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import Features from '@/Components/Features';
import axios from 'axios';
import Comic from '@/Components/Comic';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

export async function getStaticProps() {
    const { data: featurePosts } = await axios.get('http://localhost:3001/features');
    const { data: comics } = await axios.get('http://localhost:3001/comics');
    return {
        props: {
            featurePosts,
            comics,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    };
}

export default function Home(props) {
    const featurePosts = props.featurePosts;
    const comics = props.comics;

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <main>
                <div className="featured pb-3 px-2">
                    <h2 className="max-w-7xl mx-auto text-xl my-2 font-bold">Featured</h2>
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {featurePosts.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Features data={item} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <div className="latest-update py-3 px-2 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-xl my-2 font-bold">Latest update</h2>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
                            {comics.map((item, index) => {
                                return <Comic key={item.id} data={item} />;
                            })}
                        </div>
                        <div className="flex justify-end">
                            <Link
                                href="/about"
                                className="flex items-center transition duration-150 ease-in-out hover:drop-shadow-lg hover:text-red-500"
                            >
                                More <AiOutlineArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}