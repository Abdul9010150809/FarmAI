import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Auth actions
const AuthActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  token: null
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case AuthActions.LOGOUT:
      return {
        ...initialState,
        isLoading: false
      };
    
    case AuthActions.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case AuthActions.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case AuthActions.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for stored auth data on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('farmai_token');
        const userData = localStorage.getItem('farmai_user');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch({
            type: AuthActions.LOGIN,
            payload: { user, token }
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch({ type: AuthActions.SET_ERROR, payload: 'Failed to restore session' });
      } finally {
        dispatch({ type: AuthActions.SET_LOADING, payload: false });
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: AuthActions.SET_LOADING, payload: true });
      
      // Simulate API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store auth data
      localStorage.setItem('farmai_token', data.token);
      localStorage.setItem('farmai_user', JSON.stringify(data.user));
      
      dispatch({
        type: AuthActions.LOGIN,
        payload: { user: data.user, token: data.token }
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      dispatch({ type: AuthActions.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('farmai_token');
    localStorage.removeItem('farmai_user');
    dispatch({ type: AuthActions.LOGOUT });
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AuthActions.SET_LOADING, payload: true });
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      
      // Auto-login after registration
      localStorage.setItem('farmai_token', data.token);
      localStorage.setItem('farmai_user', JSON.stringify(data.user));
      
      dispatch({
        type: AuthActions.LOGIN,
        payload: { user: data.user, token: data.token }
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      dispatch({ type: AuthActions.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const updatedUser = await response.json();
      localStorage.setItem('farmai_user', JSON.stringify(updatedUser));
      
      dispatch({
        type: AuthActions.UPDATE_USER,
        payload: updatedUser
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Profile update failed';
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AuthActions.SET_ERROR, payload: null });
  };

  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    login,
    logout,
    register,
    updateProfile,
    clearError,
    
    // Helper getters
    isFarmer: state.user?.role === 'farmer',
    isAdmin: state.user?.role === 'admin',
    isAgronomist: state.user?.role === 'agronomist',
    hasFarm: !!state.user?.farmId
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher Order Component for protected routes
export const withAuth = (Component) => {
  return function WithAuthComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="spinner w-8 h-8"></div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      // Redirect to login or show access denied
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }
    
    return <Component {...props} />;
  };
};

export default AuthContext;