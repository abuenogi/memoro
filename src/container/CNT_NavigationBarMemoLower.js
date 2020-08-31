import React, { useContext } from "react";
import { withRouter } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import NavigationBarMemoLower from '../components/NavigationBarMemoLower';

const CNT_NavigationBarMemoLower = ({history}) => {

    const memorenyoSelected = useContext(UserContext);
    
    console.log ('memorenyoSelected en CNT_NavigationBarMemoLower vale ', memorenyoSelected);

      function onClickBarMemo (pathname) {
        history.push({
            pathname: pathname,
          });
      }


    return (
        <NavigationBarMemoLower onClickBarMemo={onClickBarMemo}/>
    )

};
export default withRouter(CNT_NavigationBarMemoLower);