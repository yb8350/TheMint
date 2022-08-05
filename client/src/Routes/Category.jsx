import React from 'react';
import styled from 'styled-components';
import CateCardList from '../components/ui/category/CateCardList';
import Dropdown from '../components/ui/category/SelectBox';

function Category({ categoryName }) {
  return (
    <Container>
      <CateListContainer>
        <CateCardList categoryName={categoryName} />
      </CateListContainer>
      <Dropdown />
    </Container>
  );
}

export default Category;

const Container = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-top: 1px;
`;

const CateListContainer = styled.header`
  margin-bottom: 1.25rem;
  margin-top: 70px;
`;
