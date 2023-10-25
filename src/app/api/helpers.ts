/* File: src/app/api/helper/helper.ts */
import { NextResponse } from 'next/server';

async function handleDatabaseOperation<T>(operation: () => Promise<T>, successMessage: string): Promise<NextResponse> {
  try {
    const result = await operation();
    console.log('resultX', result);

    if (result) {
      return NextResponse.json({ data: result, message: successMessage }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No data returned from operation." }, { status: 204 });  // Status 204: No Content
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error('An unexpected error occurred:', error);
      return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
    }
  }
}

export { handleDatabaseOperation };