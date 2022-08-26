import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { useGetPostsQuery } from "../generated/graphql";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { useState } from 'react';
import NextLink from 'next/link';
import { UpvoteSection } from '../components/UpvoteSection';
import { Link } from '@chakra-ui/react';
import { PostButtons } from '../components/PostButtons';
import Head from 'next/head';
import { Tweet } from '../components/Tweet';
import { AuthModal } from "../components/AuthModal";

const Index = () => {
  const [variables, setVariables] = useState({ 
    limit: 15, cursor: null as null | string 
  });

  const [{data, error, fetching }] = useGetPostsQuery({
    variables,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
      setModalOpen(false);
  }
  

  if(!fetching && !data && !error) {
    return <div>There are no posts yet</div>;
  }

  if(error) {
    return <div>{error?.message}</div>;
  }

  return (
    <Layout openModal={openModal}>
      <Head>
        <title>Twitter</title>
      </Head>
      {/* if data is true, the posts are going to show. */}
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <ul className="tweet-list">
          {data!.posts.posts.map((post) => // ! exclamation point tells us that data variable is definitely going to have data
            !post 
              ? null 
              : // some posts may be null, so we use this to not show already deleted post, otherwise they throw an error. it is used for invalidating cache
          ( 
            <Tweet key={post.id} post={post} openModal={openModal}></Tweet>
          ))}
        </ul>    
      )}
      { data && data.posts.hasMore ? ( 
        <Flex>
          <Button onClick={() => { setVariables(
            { 
              limit: variables.limit, 
              cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
            })
          }} isLoading={fetching} m="auto" my={8}>
            Load more
          </Button>
        </Flex>
      ) : null}
      { isModalOpen 
          ? <AuthModal closeModal={closeModal}></AuthModal>
          : ''
      }
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index) // { ssr: true } enables server-side-rendering. The rule for server-side rendering is using it only for pages that needs to be found by Google + if it contains dynamic data. That means that login or register page does not contain any dynamic data, but the index page has (posts). Not every page needs this.
