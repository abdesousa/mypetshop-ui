import { Injectable } from '@angular/core';

@Injectable()
export class AppConstants {
  
    // para utilizar nos cadastros
    mode_create: string = 'C';
    mode_remove: string = 'R';
    mode_update: string = 'U';
    mode_delete: string = 'D';

    // parametro - tipo de acidente
    parametro_tipo_acidente: string = 'tipo_acidente'; 

    // parametro - tipo de acidente
    parametro_tipo_sexo: string = 'sexo'; 

    // parametro - tipo de acidente - relacao_trabalho
    parametro_tipo_relacao_trabalho: string = 'relacao_trabalho'; 
    
    // parametro - tipo de acidente - classificacao_atividade
    parametro_tipo_classificacao_atividade = 'classificacao_atividade';

    // parametro - tipo de acidente - classificacao_lesao
    parametro_tipo_classificacao_lesao = 'classificacao_lesao';

    // parametro - tipo de acidente - tipo_lesao
    parametro_tipo_tipo_lesao = 'tipo_lesao';

    // parametro - tipo de acidente - parte_corpo
    parametro_tipo_parte_corpo = 'parte_corpo_atingida';

    // parametro - classificacao_perda_impacto_saude_seguranca
    parametro_tipo_classificacao_perda_impacto_saude_seguranca = "classificacao_perda_impacto_saude_seguranca";

    // parametro - classificacao_perda_impacto_meio_ambiente
    parametro_tipo_classificacao_perda_impacto_meio_ambiente = "classificacao_perda_impacto_meio_ambiente";

    // parametro - severidade
    parametro_tipo_severidade = "severidade";

    // parametro - severidade
    parametro_tipo_incidente_tipo_impacto = "incidente_tipo_impacto";

    // parametro - status
    parametro_status = "status";

    // {
    //     "hash_id": "9DLZa1jZ37",
    //     "tipo": "incidente_tipo_impacto",
    //     "descricao": "Impactos Meio Ambiente",
    //     "created_at": "2019-06-05 13:18:22",
    //     "updated_at": "2019-06-05 13:18:22",
    //     "key": "9DLZa1jZ37",
    //     "value": "Impactos Meio Ambiente"
    // },

    // parametro - severidade
    parametro_tipo_rac = "rac";

    // Full Access role
    fullaccess_role = 'FullAccess';

    // Array de estados.
    estados = [
        { key: 'AC', value: 'Acre' },
        { key: 'AL', value: 'Alagoas' },
        { key: 'AP', value: 'Amapá' },
        { key: 'AM', value: 'Amazonas' },
        { key: 'BA', value: 'Bahia' },
        { key: 'CE', value: 'Ceará' },
        { key: 'DF', value: 'Distrito Federal' },
        { key: 'ES', value: 'Espírito Santo' },
        { key: 'GO', value: 'Goiás' }, 
        { key: 'MA', value: 'Maranhão' },
        { key: 'MT', value: 'Mato Grosso' },
        { key: 'MS', value: 'Mato Grosso do Sul' },
        { key: 'MG', value: 'Minas Gerais' },
        { key: 'PA', value: 'Pará' },
        { key: 'PB', value: 'Paraíba' },
        { key: 'PR', value: 'Paraná' },
        { key: 'PE', value: 'Pernambuco' },
        { key: 'PI', value: 'Piauí' },
        { key: 'RJ', value: 'Rio de Janeiro' },
        { key: 'RN', value: 'Rio Grande do Norte' },
        { key: 'RS', value: 'Rio Grande do Sul' },
        { key: 'RO', value: 'Rondônia' },
        { key: 'RR', value: 'Roraima' },
        { key: 'SC', value: 'Santa Catarina' },
        { key: 'SP', value: 'São Paulo' },
        { key: 'SE', value: 'Sergipe' },
        { key: 'TO', value: 'Tocantins' }
    ];

}