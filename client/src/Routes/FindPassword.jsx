import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import SignContainer from '../components/common/SignContainer';
import EmailCheck from '../components/findPassword/EmailCheck';
import NewPassword from '../components/findPassword/NewPassword';
import { PAGES } from '../utils/constants/constant';

function FindPassword(props) {
  const [isPassed, setIsPassed] = useState(true);
  return (
    <>
      <Helmet>
        <title>비밀번호 찾기 | 더민트</title>
      </Helmet>
      <SignContainer pageName={PAGES.FIND_PASSWORD}>
        {!isPassed ? <EmailCheck setIsPassed={setIsPassed} /> : <NewPassword />}
      </SignContainer>
    </>
  );
}

export default FindPassword;
