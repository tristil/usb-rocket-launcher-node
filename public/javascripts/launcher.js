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
          $('#' + item).mousedown(
            function(event)
            {
              submitCommand(item);
            }
          );

          $('#' + item).mouseup(
            function(event)
            {
              submitCommand('stop');
            }
          );
        }
      );
    }
);

