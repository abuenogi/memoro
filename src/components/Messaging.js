import React  from 'react'
import { Container, Spinner } from 'reactstrap';
import useFetch from '../fuctions/useFetch'
import { withRouter } from 'react-router-dom';

const Messaging = () => {
  
    let url ='http://localhost:5001/memoro-e03d4/us-central1/msg';

        const { data, loading, error } = useFetch(url);


    return (
      <Container>
        {/* form goes here */}
        <div className="message-list">
          <h3>Messages</h3>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <>
              {data.map((m, index) => {
                const { name, message } = m;
                return (
                  <div key={index}>
                    {name}: {message}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </Container>
    );
  };
  export default withRouter(Messaging);