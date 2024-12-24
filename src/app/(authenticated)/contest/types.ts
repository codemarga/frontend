// Define the structure of a Contest object
export interface Contest {
    title: string;
    startTime: string;
    type: 'weekly' | 'biweekly' | 'special'; // You can extend this with more types if needed
  }
  
  // Define the structure of the Problem object (for problem description)
  export interface Problem {
    title: string;
    description: string;
    constraints: string[];
    example: string;
    input: string;
    output: string;
  }
  
  // Define the structure of the Code Editor value (if you want to track it)
  export interface EditorContent {
    code: string;
    language: 'javascript' | 'python' | 'java' | 'cpp'; // You can add more languages if needed
  }
  