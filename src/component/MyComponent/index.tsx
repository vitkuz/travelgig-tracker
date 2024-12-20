import { useAuth } from '@/context/AuthContext';

function MyComponent() {
    const { user, isLoading, error, login, logout } = useAuth();

    // https://ipgz7wpkd3.execute-api.us-east-1.amazonaws.com/prod/auth/validate?userId=210932263&secret=0464c78d793df005a40d93ada154b6a596ac8eb2f96d07c63ecb4b644bb7006d

    const handleLogin = async () => {
        await login('210932263', '0464c78d793df005a40d93ada154b6a596ac8eb2f96d07c63ecb4b644bb7006d');
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {user ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
}
export default MyComponent;