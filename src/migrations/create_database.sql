-- DROP SCHEMA user_vigia;
CREATE DATABASE sisvigia OWNER postgres ENCODING 'UTF8';
CREATE SCHEMA user_vigia AUTHORIZATION postgres;

CREATE TABLE IF NOT EXISTS "user_vigia".tb_usuario (
	id int8 NOT NULL,
	nome varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255),
	dt_criacao timestamp NOT NULL DEFAULT now(),
	CONSTRAINT tb_usuario_pk PRIMARY KEY (id)
);
COMMENT ON TABLE "user_vigia".tb_usuario IS 'Tabela de Usuários';

-- Column comments

COMMENT ON COLUMN "user_vigia".tb_usuario.id IS 'Codigo Unico de Usuário';
COMMENT ON COLUMN "user_vigia".tb_usuario.nome IS 'Nome do usuário';
COMMENT ON COLUMN "user_vigia".tb_usuario.email IS 'email do usuario';
COMMENT ON COLUMN "user_vigia".tb_usuario.password IS 'password do usuario';
COMMENT ON COLUMN "user_vigia".tb_usuario.dt_criacao IS 'Data de criação do usuário';

-- user_vigia.user_vigia_tb_usuario_seq definition

-- DROP SEQUENCE user_vigia.user_vigia_tb_usuario_seq;

CREATE SEQUENCE user_vigia.tb_usuario_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

ALTER TABLE user_vigia.tb_usuario ALTER COLUMN id SET DEFAULT nextval('user_vigia.tb_usuario_seq');


-- user_vigia.tb_gbm_seq definition

-- DROP SEQUENCE user_vigia.tb_gbm_seq;

CREATE SEQUENCE user_vigia.tb_gbm_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

CREATE TABLE user_vigia.tb_gbm (
	gbm_id int8 NOT NULL DEFAULT nextval('user_vigia.tb_gbm_seq'),
	nm_gbm varchar(255) NOT NULL,
	sgl_gbm varchar(6) NOT NULL,
	gbm_st_ativo boolean NOT NULL DEFAULT true,
	dt_criacao timestamp NOT NULL DEFAULT now(),
	CONSTRAINT tb_gbm_pk PRIMARY KEY (gbm_id)
);
COMMENT ON TABLE user_vigia.tb_gbm IS 'Tabela de Grupamentos de Bombeiros MIlitar';

-- Column comments

COMMENT ON COLUMN user_vigia.tb_gbm.gbm_id IS 'Identificador unico do gbm';
COMMENT ON COLUMN user_vigia.tb_gbm.nm_gbm IS 'Nome do GBM';
COMMENT ON COLUMN user_vigia.tb_gbm.sgl_gbm IS 'Sigla do GBM';
COMMENT ON COLUMN user_vigia.tb_gbm.gbm_st_ativo IS 'Status do GBM (ativo ou inativo)';
COMMENT ON COLUMN user_vigia.tb_gbm.dt_criacao IS 'Data de Criação do registro!';
