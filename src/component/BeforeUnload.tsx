import { useEffect } from 'react';

const useBeforeUnload = (callback: () => void) => {
    useEffect(() => {
        const handleBeforeUnload = () => {
            callback();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [callback]);
};

export default useBeforeUnload;
