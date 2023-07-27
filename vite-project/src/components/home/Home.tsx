import  { ReactElement } from 'react';
import { EuiPageHeader, EuiImage, EuiPageSection } from '@elastic/eui';


export default ({
  content = <></>,
  extendedBorder,
  restrictWidth,
  centeredContent,
}: {
  content: ReactElement;
  extendedBorder?: boolean;
  restrictWidth?: boolean;
  centeredContent?: boolean;
}) => {
  const width = restrictWidth ? '75%' : false;
  const bottomBorder = extendedBorder ? 'extended' : true;
  return (
    <>
      <EuiPageHeader
        paddingSize="l"
        restrictWidth={width}
        bottomBorder={bottomBorder}
        pageTitle="This is one of the most straightforward business owner titles, as it immediately indicates a person's main role in an organization."
        description="Let your passion and excitement show in the company description section as you explain why you started the company and what you hope to accomplish. Your excitement should show in the tone of your writing, and your aim should be to get the reader interested in reading the rest of the business plan."
      />
     
      <EuiPageSection
        restrictWidth={width}
        alignment={centeredContent ? 'center' : 'top'}
        color={extendedBorder ? 'plain' : 'transparent'}
        grow={centeredContent ? true : false}
      >
        {content}
      </EuiPageSection>

      <EuiImage
   margin="xl"
  alt={"dog"}
  src={"https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"}
/>
    </>
  );
};
     