import { Box, Typography } from '@mui/material';
import Carousel from '../../../Components/Carousel';
import profile from '../../../Assets/images/future.jpg';
import philip from '../../../Assets/images/philip.jpg'
import rachel from '../../../Assets/images/rachel.jpg'
import peter from '../../../Assets/images/peter.jpg'

export const TeamSection: React.FC = () => {
  return (
    <div className=''>
        {/* meet the team */}
        <section className="container mx-auto py-40 px-8">
          <div className='grid lg:grid-cols-3'>
            <div>
              hello world
              <img src={philip} className='rounded mx-auto'/>
            </div>
            <div>
              hello world
            </div>
            <div>
              hello world
            </div>
          </div>
        </section>
    </div>
  );
}; 