import { Box, Container } from '@mui/material';
import { SectionIdEnum } from '../../../Types';

export type SectionContainerProps = {
  children: React.ReactNode;
  sectionId: SectionIdEnum;
};

export const SectionContainer: React.FC<SectionContainerProps> = ({ children, sectionId }) => {
  return (
    <div id={sectionId} key={sectionId}>
      <Container maxWidth={false}  disableGutters>
        <Box maxWidth="100vw">{children}</Box>
      </Container>
    </div>
  );
};