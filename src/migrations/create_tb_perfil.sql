-- user_vigia.tb_perfil_cod_perfil_seq definition

-- DROP SEQUENCE user_vigia.tb_perfil_cod_perfil_seq;

CREATE SEQUENCE user_vigia.tb_perfil_cod_perfil_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

CREATE TABLE user_vigia.tb_perfil (
	cod_perfil int8 NOT NULL DEFAULT nextval('user_vigia.tb_perfil_cod_perfil_seq'),
	nom_perfil varchar NOT NULL,
	sgl_perfil varchar NOT NULL,
	st_perfil_ativo boolean NOT NULL DEFAULT true,
	cod_perfil_pai int8 NULL,
	dt_inclusao timestamp NOT NULL DEFAULT now(),
	CONSTRAINT tb_perfil_pk PRIMARY KEY (cod_perfil)
);
COMMENT ON TABLE user_vigia.tb_perfil IS 'Perfil de acesso ao sistema';

-- Column comments

COMMENT ON COLUMN user_vigia.tb_perfil.cod_perfil IS 'Código identificador de perfil';
COMMENT ON COLUMN user_vigia.tb_perfil.nom_perfil IS 'Nome do perfil';
COMMENT ON COLUMN user_vigia.tb_perfil.sgl_perfil IS 'Sigla do Perfil';
COMMENT ON COLUMN user_vigia.tb_perfil.st_perfil_ativo IS 'Status do Perfil';
COMMENT ON COLUMN user_vigia.tb_perfil.cod_perfil_pai IS 'Código do perfil pai';
COMMENT ON COLUMN user_vigia.tb_perfil.dt_inclusao IS 'Data da inclusão no sistema';



-- user_vigia.tb_usuario_perfil definition

CREATE TABLE user_vigia.tb_usuario_perfil (
	cod_perfil int8 NOT NULL,
	cod_usuario int8 NOT NULL,
	dt_inclusao timestamp NOT NULL DEFAULT now(),
	st_ativo boolean NOT NULL DEFAULT true,
	dt_atualizacao timestamp NULL,
	CONSTRAINT tb_usuario_perfil_un UNIQUE (cod_perfil,cod_usuario)
);
COMMENT ON TABLE user_vigia.tb_usuario_perfil IS 'Tabela de relacionamento entre usuário e perfil';

-- Column comments

COMMENT ON COLUMN user_vigia.tb_usuario_perfil.cod_perfil IS 'Código do perfil';
COMMENT ON COLUMN user_vigia.tb_usuario_perfil.cod_usuario IS 'Código do usuário';
COMMENT ON COLUMN user_vigia.tb_usuario_perfil.dt_inclusao IS 'Data de inclusão!';
COMMENT ON COLUMN user_vigia.tb_usuario_perfil.st_ativo IS 'Situação do usuário e perfil!';
COMMENT ON COLUMN user_vigia.tb_usuario_perfil.dt_atualizacao IS 'Data de atualização do registro!';



