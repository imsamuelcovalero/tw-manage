/* File: src/app/api/helper/helper.ts */
import { NextResponse } from 'next/server';

async function handleDatabaseOperation(operation: () => Promise<boolean>, successMessage: string) {
  try {
    const success = await operation();

    if (success) {
      return NextResponse.json({ message: successMessage }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Erro ao realizar operação." }, { status: 500 });
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