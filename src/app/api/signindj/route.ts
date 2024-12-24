import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mode } = body;
    console.log('Incoming request data:', { name, email, mode });
    const response = await axios.post(
      process.env.NEXT_PUBLIC_LOGIN_URL || '', 
      { name, email, mode },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log(' API response:', response.data);

    const res = NextResponse.json({ data: response.data });
    res.cookies.set('jwt', response.data.refresh, {
      httpOnly: true,
    });
    console.log('Response:', req.cookies.get('jwt'));

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      return new Response(
        JSON.stringify({
          error: 'Error posting to external backend',
          details: error.response?.data || error.message,
        }),
        {
          status: error.response?.status || 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.error('Error in POST handler:', error.message || error);
    return new Response(
      JSON.stringify({
        error: 'Error in POST handler',
        details: error.message || 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
