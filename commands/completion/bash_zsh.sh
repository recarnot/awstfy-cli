### {{program}} completion - begin ###
if type compdef &>/dev/null; then
  _{{program}}_complete() {
    compadd -- `{{program}} --compzsh --compgen "${CURRENT}" "${words[CURRENT-1]}" "${BUFFER}"`
  }
  compdef _{{program}}_complete {{program}}
elif type complete &>/dev/null; then
  _{{program}}_complete() {
    COMPREPLY=( $(compgen -W '$({{program}} --compbash --compgen "${COMP_CWORD}" "${COMP_WORDS[COMP_CWORD-1]}" "${COMP_LINE}")' -- "${COMP_WORDS[COMP_CWORD]}") )
  }
  complete -F _{{program}}_complete {{program}}
fi
### {{program}} completion - end ###

