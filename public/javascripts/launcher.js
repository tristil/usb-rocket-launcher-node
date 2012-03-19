function submitCommand(command)
{
  $.ajax(
      {
        url : '/perform_command/' + command,
        success : function(data)
        {

        }
      }
  );

}

$(document).ready(
    function()
    {
      $(['up', 'down', 'left', 'right', 'shoot']).each(
        function(index, item)
        {
          $('#' + item).on('vmousedown',
            function(event)
            {
              submitCommand(item);
            }
          );

          if(item != 'shoot')
          {
            $('#' + item).on('vmouseup',
              function(event)
              {
                submitCommand('stop');
              }
            );
          }
        }
      );
    }
);

