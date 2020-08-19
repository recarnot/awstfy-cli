### {{program}} completion - begin. ###
function _{{program}}_completion
  {{program}} --compfish --compgen (count (commandline -poc)) (commandline -pt) (commandline -pb)
end
complete -f -c {{program}} -a '(_{{program}}_completion)'
### {{program}} completion - end ###
