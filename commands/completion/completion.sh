#### {{program}} completion script ####
_{{program}}_complete()
{
    local cur prev opts base
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"

    #Dedicated rule for Terraform version
    if [[ $prev = "--terraform" ]] ; then 
        COMPREPLY=( $(compgen -W "0.12 0.13" -- ${cur}) )
        return 0
    fi

    #Dedicated rule for Provider type
    if [[ $prev = "--provider-type" ]] ; then 
        COMPREPLY=( $(compgen -W "local tfc" -- ${cur}) )
        return 0
    fi

    #Dedicated rule for Backend type
    if [[ $prev = "--backend-type" ]] ; then 
        COMPREPLY=( $(compgen -W "local tfc s3" -- ${cur}) )
        return 0
    fi
    
    #Dedicated rule for Terraform Cloud host
    if [[ $prev = "--tfc-host" ]] ; then 
        COMPREPLY=( $(compgen -W "app.terraform.io" -- ${cur}) )
        return 0
    fi

    #Silent mode for 'configure' command
    if [[ ${COMP_WORDS[1]} == *"configure"* ]] ; then 
        COMPREPLY=( $(compgen -W "--silent --context --environment --terraform" -- ${cur}) )
        return 0
    fi

    #Silent mode for 'provider' command
    if [[ ${COMP_WORDS[1]} == *"provider"* ]] ; then 
        COMPREPLY=( $(compgen -W "--silent --provider-type --aws-profile --aws-region --tfc-ket --tfc-secret --tfc-region" -- ${cur}) )
        return 0
    fi

    #Silent mode for 'backend' command
    if [[ ${COMP_WORDS[1]} == *"backend"* ]] ; then 
        COMPREPLY=( $(compgen -W "--silent --backend-type --tfc-host --tfc-organization --tfc-workspace --bucket-name --bucket-key --bucket-region" -- ${cur}) )
        return 0
    fi
    
    ##Disabel loop on the rest of basic commands
    if [[ $COMP_CWORD -gt 2 ]] ; then 
        return 0
    fi
    
    basic="configure provider backend version help init plan apply destroy setup-completion module"
    complex="add env profile cloud var"
    opts=$basic" "$complex

    if [[ $basic == *"${prev}"* ]]; then
        return 0
    fi

    case "${prev}" in
        profile)
            COMPREPLY=( $(compgen -W "list configure" -- ${cur}) )
            return 0
            ;;
        env)
            COMPREPLY=( $(compgen -W "list select show new" -- ${cur}) )
            return 0
            ;;
        var)
            COMPREPLY=( $(compgen -W "list add update delete" -- ${cur}) )
            return 0
            ;;
        cloud)
            COMPREPLY=( $(compgen -W "init" -- ${cur}) )
            return 0
            ;;
        add)
            COMPREPLY=( $(compgen -W "vpc storage sns dns state provider" -- ${cur}) )
            return 0
            ;;
        *)
        ;;
    esac

   COMPREPLY=($(compgen -W "${opts}" -- ${cur}))
   return 0
}
complete -F _{{program}}_complete {{program}}
#### {{program}} completion script end ####