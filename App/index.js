<html>

  <head>
    <title>storj audit demo</title>

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">
    <script src="stream_bundle.js"></script>
    <script src="sha3.min.js"></script>
    <script src="bundle.js"></script>

    <script src="jquery-2.0.3.min.js"></script>
    <script src="cytoscape.min.js"></script>

    <script src="https://cdn.rawgit.com/cpettitt/dagre/v0.7.4/dist/dagre.min.js"></script>
    <script src="https://cdn.rawgit.com/cytoscape/cytoscape.js-dagre/1.1.2/cytoscape-dagre.js"></script>

    <style>
      body {
        font-family: helvetica;
        font-size: 14px;
      }
      #cy {
        width: 100%;
        height: 100%;
        left: 0;
        top: 50px;
      }
      h1 {
        opacity: 0.5;
        font-size: 1em;
      }
    </style>
    
    <script>
      let a
      a = new App()
      $(document).ready(function() {

        var tBalance = a.getTokenBalance((res)=>{
          $(".balance").html("<p>Wallet STORJ Balance</p>"+ res)
        })

        var wBalance = a.getWalletBalance()

        $('#theButton').click(function() {
          a.sendTokens($('#numTokens').val(). $('#toAddress').val(), (res)=>{
            $(".cost").html("TX cost: " + wBalance - a.getWalletBalance())
          })

          renderGraph(a.shard)
          audit(a.shard.index)
        });
      });

      var audit = function(index) {

      }

      var handleFiles = function(files) {
        a = new App(window.shard)
        var rs = window.getFileStream(files);
        a.generateNodes(rs, (tree) => {
          //renderGraph(tree)
          //console.log(tree)
        })
      }
    </script>
  </head>

  <body>
    <h1>Storj Multisig Wallet</h1>
    <div class="balance"></div>
    <p style="color:blue">Submit Token Transaction: </p>
    <p>To:</p>
    <input type="text" id="toAddress" name="valueId" size="36"/>
    <br/>
    <p>Tokens:</p>
    <input type="text" id="numTokens" name="valueId" size="6"/>
    <br/>
    <button type="submit" id="theButton" name="submitButton">Send Tokens</button>
    <div class="cost"></div>
    <div id="cy"></div>

  </body>

</html>
