import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Loader from 'ui-component/Loader';
import Notistack from 'ui-component/third-party/Notistack';

import ThemeCustomization from 'themes';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
    // useEffect(() => {
    //     if (["http://localhost:3000", "http://127.0.0.1:3000", "https://talent-scope.netlify.app"].includes(window.location.origin)) {
    //         document.title = 'Talent Scope Development'
    //     }
    // }, [])
    return (
        <ThemeCustomization>
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <Notistack>
                                <RouterProvider router={router} />
                                <Snackbar />
                            </Notistack>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

export default App;
