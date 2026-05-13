# Configuração do Supabase para o App

Este documento explica como configurar o Supabase para usar com o sistema de autenticação do aplicativo.

## 1. Criar Projeto Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Escolha sua organização ou crie uma nova
5. Dê um nome ao projeto (ex: "climatic-disaster-app")
6. Escolha uma senha forte para o banco de dados
7. Selecione a região mais próxima de você
8. Aguarde a criação do projeto (pode levar alguns minutos)

## 2. Obter Credenciais

1. No dashboard do seu projeto, vá para **Settings > API**
2. Copie os seguintes valores:
   - **Project URL** (algo como `https://xxxxxxxx.supabase.co`)
   - **anon public** (chave anônima)

## 3. Configurar Variáveis de Ambiente

Abra o arquivo `.env.local` na raiz do projeto e substitua os valores:

```env
# Supabase Configuration
VITE_SUPABASE_URL=SEU_PROJECT_URL_AQUI
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA_AQUI
```

**Importante:** Substitua `SEU_PROJECT_URL_AQUI` e `SUA_CHAVE_ANONIMA_AQUI` pelos valores reais que você copiou.

## 4. Configurar Autenticação por E-mail

1. No dashboard Supabase, vá para **Authentication > Settings**
2. Na seção "Site URL", adicione: `http://localhost:5173`
3. Na seção "Redirect URLs", adicione: `http://localhost:5173/auth/callback`
4. Na seção "Email confirmation", certifique-se que "Enable email confirmations" está **ativado**
5. Configure o template de e-mail de confirmação se desejar

## 5. Criar Tabela de Favoritos

Para armazenar os favoritos dos usuários:

1. Vá para **SQL Editor** no dashboard
2. Clique em "New query"
3. Cole e execute o seguinte SQL:

```sql
-- Criar tabela de favoritos dos usuários
CREATE TABLE user_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  favorites JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para melhor performance
CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);

-- Criar trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_favorites_updated_at 
  BEFORE UPDATE ON user_favorites 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 6. Criar Tabelas de Ocorrências e Relatos

Para armazenar ocorrências e relatos criados pelos usuários:

1. Vá para **SQL Editor** no dashboard
2. Clique em "New query"
3. Cole e execute o seguinte SQL:

```sql
-- Criar tabela de ocorrências
CREATE TABLE user_occurrences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('ALAGAMENTO', 'TEMPESTADE', 'ENCHENTE', 'GRANIZO', 'VENDAVAL', 'CICLONE', 'DESLIZAMENTO')),
  severity TEXT NOT NULL CHECK (severity IN ('Perigo Baixo', 'Perigo Médio', 'Perigo Alto')),
  severity_color TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('RS', 'SC', 'PR')),
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  reports_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de relatos individuais
CREATE TABLE user_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  occurrence_id UUID REFERENCES user_occurrences(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX idx_user_occurrences_user_id ON user_occurrences(user_id);
CREATE INDEX idx_user_occurrences_date ON user_occurrences(date DESC);
CREATE INDEX idx_user_reports_occurrence_id ON user_reports(occurrence_id);
CREATE INDEX idx_user_reports_user_id ON user_reports(user_id);

-- Criar triggers para atualizar updated_at
CREATE TRIGGER update_user_occurrences_updated_at 
  BEFORE UPDATE ON user_occurrences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_reports_updated_at 
  BEFORE UPDATE ON user_reports 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 7. Criar Tabela de Perfis (Opcional)

Para armazenar informações adicionais dos usuários:

1. Vá para **SQL Editor** no dashboard
2. Clique em "New query"
3. Cole e execute o seguinte SQL:

```sql
-- Criar tabela de perfis
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT
);

-- Criar trigger para automaticamente criar perfil quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, new.raw_user_meta_data->>'display_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 8. Testar o Sistema

1. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Abra `http://localhost:5173`

3. Teste o cadastro:
   - Preencha o formulário de cadastro
   - Verifique seu e-mail (inclua a pasta de spam)
   - Clique no link de confirmação
   - Tente fazer login

## 9. Solução de Problemas

### E-mail não chega
- Verifique a pasta de spam/lixeira
- Confirme que as configurações de e-mail estão corretas no Supabase
- Tente usar um e-mail diferente

### Erro de CORS
- Verifique se `http://localhost:5173` está nas configurações de Site URL
- Reinicie o servidor de desenvolvimento

### Erro de autenticação
- Verifique se as variáveis de ambiente estão corretas
- Confirme se as chaves foram copiadas sem espaços extras
- Verifique o console do navegador para mensagens de erro

## 10. Deploy em Produção

Quando for fazer deploy, lembre-se de:
1. Adicionar as variáveis de ambiente do Supabase no seu serviço de hosting
2. Atualizar as URLs de redirect para o domínio de produção
3. Configurar um domínio personalizado para e-mails (opcional)

---

## Resumo das Funcionalidades Implementadas

✅ **Cadastro com confirmação por e-mail**
✅ **Login seguro com Supabase**
✅ **Botão voltar no formulário de cadastro**
✅ **Logout funcional que realmente encerra a sessão**
✅ **Persistência de sessão automática**
✅ **Validação de e-mails existentes**
✅ **Interface de erro melhorada**
✅ **Estado de carregamento durante operações**
✅ **Sistema de favoritos persistente por usuário**
