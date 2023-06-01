import { Box, Container } from '@mui/material';
import { SectionIdEnum } from '../../../Data/Types';

export type SectionContainerProps = {
  children: React.ReactNode;
  sectionId: SectionIdEnum;
};

export const SectionContainer: React.FC<SectionContainerProps> = ({ children, sectionId }) => {
  return (
    <div id={sectionId} key={sectionId}>
      <Container maxWidth={false}>
        <div className='max-h-screen'>
          {children}
        </div>
        
      </Container>
    </div>
  );
};