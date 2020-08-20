#### {{program}} completion script ####
_{{program}}_complete()
{
    local cur prev opts base
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"

    if [[ $prev = "--context-version" ]] ; then 
        COMPREPLY=( $(compgen -W "0.12 0.13" -- ${cur}) )
    fi
    
    if [[ $COMP_CWORD -gt 2 ]] ; then 
        return 0
    fi

    basic="configure provider backend version help init plan apply destroy"
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