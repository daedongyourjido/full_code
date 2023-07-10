import React from 'react';
import ComponentCarousel from 'react-awesome-component-carousel';
import './image.css';
 
const component1 = () => (
  <div style={{ height:  '550px', width: '550px'}}>
    <div className='container'>
    <img className="iimg" alt="iPhone_01" src="img/flower.jpg" />
    </div>
  </div>
);
const component2 = () => (
  <div style={{backgroundColor: '#80a5fd', height:  '100vh', width: '100vw'}}>
    <h1>Slide 2</h1>
  </div>
);
const component3 = () => (
  <div style={{backgroundColor: '#1ccb9e', height:  '10vh', width: '10vw'}}>
    <h1>Slide 3</h1>
  </div>
);
 
const components = [component1, component2, component3];
 
export default class App extends React.Component {
  render() {
    return (
      <div style={{ width: '550px', height: '550px', position: 'relative', overflow: 'hidden' }}>
        <ComponentCarousel
          transition={'slide'}
          transitionDuration={0.3}
          coolOff={6}
          components={components}
          dots={"true"}
        />
      </div>
    );
  }
}