import React from 'react';
import { Redirect } from '@docusaurus/router';

export default function Home() {
  console.log('home');
  return <Redirect to="/docs" />;
}
