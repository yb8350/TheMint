import React, { useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import { getData } from '../../utils/apis/api';
import useObserver from '../../utils/hooks/useObserver';

function InfiniteAuctionList({ getUrl, queryKey, CardComponent, SkeltonCardComponent, text }) {
  const [hasError, setHasError] = useState(false);
  const [isMore, SetIsMore] = useState(true);
  const bottom = useRef(null);

  const getTargetAuctionList = async ({ pageParam = 0 }) => {
    if (pageParam === false) {
      return;
    }
    try {
      const res = await getData(getUrl(pageParam));
      return { data: res?.data, page: pageParam };
    } catch (_) {
      setHasError(true);
    }
  };
  const { isLoading, data, error, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery(
    queryKey,
    getTargetAuctionList,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.hasOwnProperty('hasMore')) {
          const {
            data: { hasMore },
          } = lastPage;
          if (hasMore) return lastPage.page + 1;
          return false;
        }
        return false;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: 60 * 1000,
    },
  );

  console.log(data);

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
    hasMore:
      data?.pageParams?.length > 1 ? Boolean(data?.pageParams[data?.pageParams?.length - 1]) : true,
    hasError,
  });

  return (
    <div>
      {data?.pages[0]?.data?.resultList.length < 1 && <p>{text}</p>}
      {isLoading && (
        <GridContainer>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeltonCardComponent key={i} />
          ))}
        </GridContainer>
      )}
      {status === 'error' && <p>{error.message}</p>}
      {status === 'success' &&
        data.pages.map((group, index) => (
          <GridContainer key={index}>
            {group?.data?.resultList?.map((auction, idx) => (
              <CardComponent auction={auction} key={idx} />
            ))}
          </GridContainer>
        ))}
      <div ref={bottom} />
      {isFetchingNextPage && (
        <GridContainer>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeltonCardComponent key={i} />
          ))}
        </GridContainer>
      )}
    </div>
  );
}

export default InfiniteAuctionList;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
