import { useState, useEffect } from 'react';

import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        const user = {
            email,
            password,
        };

        const res = await login(user);

        console.log(res);
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.login}>
            <h1>Log in</h1>
            <p>Log in to be able to use the system</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email:</span>
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='User e-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        type='password'
                        name='password'
                        required
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {!loading && <button className='btn'>Log in</button>}
                {loading && (
                    <button className='btn' disabled>
                        Wait...
                    </button>
                )}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
