'use server'; // Note: must have for revalidatePath(); to work

import { config } from '@/../config';
import { revalidatePath } from "next/cache";
import PocketBase from "pocketbase";

const db = new PocketBase(config.pocketbaseAPIBaseUrl);

const notesCollection = db.collection('notes');
const notesPath = "/notes";

// Checks if the PocketBase server is running
const isPocketbaseServerOnline = async () => {
  try {
    // There is currently an issue with pocketbase db status check() method always returning true when server has not started!
    // const response = await db.health.check();
    // console.log(response);
    // if (response.code === 200) {
    //   console.log('PocketBase server is running');
    //   return true;
    // }

    // http://127.0.0.1:8090/api/health
    const response = await fetch(`${config.pocketbaseAPIBaseUrl}/api/health`, { cache: 'no-store' });
    const data = await response.json();
    
    if (data.code === 200) {
      console.log('PocketBase server is running');
      return true;
    } else {
      console.error('PocketBase server returned an error:', data.message);
      return false;
    }
  } catch (error) {
    console.error('PocketBase server returned an error:', error);
    return false;
  }
};

// Get Notes
const getNotes = async () => {
  try {
    const data = await notesCollection.getList(1, 30, { cache: 'no-store' });
    console.log(data);
    return data?.items || [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

// Add a new note in the database
const addNote = async (data: any) => {
  try {
    await notesCollection.create(data);
    revalidatePath(notesPath); // Revalidate(update) the notes page
  }
  catch (error) {
    console.error('Error adding a new note', error);
  }
};

export { isPocketbaseServerOnline, getNotes, addNote };
