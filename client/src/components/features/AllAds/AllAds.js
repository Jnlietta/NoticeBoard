import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AllPosts = () => {
    
  return (
    <Card style={{ width: '18rem', marginTop: '20px' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>Location</Card.Text>
        <Button variant="primary">Read more</Button>
      </Card.Body>
    </Card>
  );
}

export default AllPosts;