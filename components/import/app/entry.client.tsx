import React from 'react';
import { RemixBrowser } from '@remix-run/react';
import { hydrate } from 'react-dom';

const TenantContent = React.createContext();

hydrate(<RemixBrowser />, document);
