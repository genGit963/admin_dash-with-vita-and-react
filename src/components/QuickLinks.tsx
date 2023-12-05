import React from 'react';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import BusinessIcon from '@mui/icons-material/Business';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CommuteIcon from '@mui/icons-material/Commute';

import LinkCard, { LinkCardProps } from 'src/components/LinkCard';

const QuickLinks: React.FC = () => {
  const links: LinkCardProps[] = [
    {
      title: 'Add Vehicle',
      uri: '/vehicles/create',
      description: 'Add new vehicle',
      icon: <DirectionsCarIcon fontSize="large" />,
    },
    {
      title: 'Add Vehicle Type',
      uri: '/vehicletypes/create',
      description: 'Add new vehicle type',
      icon: <CommuteIcon fontSize="large" />,
    },
    {
      title: 'Add User',
      uri: '/users/create',
      description: 'Add new users',
      icon: <PeopleAltIcon fontSize="large" />,
    },
  ];
  return (
    <>
      {links.map((x) => (
        <LinkCard {...x} key={x.title} />
      ))}
    </>
  );
};

export default QuickLinks;
