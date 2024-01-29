import supabase from "./SupabaseClient";

export const signIn = async (email, password) => {
  const { error, user } = await supabase.auth.signIn({ email, password });
  if (error) throw error;
  return user;
};

export const signUp = async (nickname, senha) => {
  const { error, user } = await supabase.auth.signUp({ email: nickname, password: senha });
  if (error) throw error;
  return user;
};

export const signUpWithGithub = async () => {
  try {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      throw error;
    }

    let { data, error: fetchError } = await supabase
      .from('users') // Reemplaza 'users' con el nombre de tu tabla de usuarios
      .select('*')
      .eq('github_id', user.id);

    if (fetchError) {
      throw fetchError;
    }

    if (!data || data.length === 0) {
      const newUser = {
        github_id: user.id,
      };

      const { data: newUserRecord, error: insertError } = await supabase
        .from('users') // Reemplaza 'users' con el nombre de tu tabla de usuarios
        .upsert([newUser], { onConflict: ['github_id'] });

      if (insertError) {
        throw insertError;
      }

      return { user: newUserRecord[0], session };
    }

    return { user: data[0], session };
  } catch (error) {
    throw error;
  }
};


export const signInWithProvider = async (provider) => {
  const { error } = await supabase.auth.signIn({ provider });
  if (error) throw error;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const signInWithGithub = async () => {
  const { user, session, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  console.log("user", user);
  console.log("session", session);
  
  if (error) throw error;
  return { user, session };
};
