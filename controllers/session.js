export const getSessionData = async (req, res) => {
    try {
        // Get cookies from the request to forward to livetutors
        const cookies = req.headers.cookie;
        
        if (!cookies) {
            return res.status(401).json({ error: 'No session cookies found' });
        }

        console.log('Fetching session from livetutors with cookies:', cookies);

        const response = await fetch('http://localhost:3000/api/auth/session', {
          method: 'GET',
          headers: {
            'Cookie': cookies,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
    
        if (!response.ok) {
          console.log('Livetutors session response not ok:', response.status);
          return res.status(401).json({ error: 'Not authenticated in livetutors' });
        }
    
        const sessionData = await response.json();
        console.log("Session data from livetutors:", sessionData);
        
        if (!sessionData.user) {
          return res.status(401).json({ error: 'No user data in session' });
        }

        // Check if session is expired
        if (sessionData.expires) {
          const expiryDate = new Date(sessionData.expires);
          const currentDate = new Date();
          
          if (expiryDate <= currentDate) {
            console.log('Session expired at:', expiryDate);
            return res.status(401).json({ error: 'Session expired' });
          }
          
          console.log('Session valid, expires at:', expiryDate);
        }
    
        // Return data in format expected by dashboard
        res.json({
          user: {
            id: sessionData.user.id,
            name: sessionData.user.name,
            email: sessionData.user.email,
            phone: sessionData.user.phone
          },
          token: sessionData.token || sessionData.accessToken,
          expires: sessionData.expires
        });
        
      } catch (error) {
        console.error('Session fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}; 