import { useEffect } from 'react';

const useBeforeUnload = (callback: () => void) => {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            callback();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [callback]);
};

export default useBeforeUnload;
