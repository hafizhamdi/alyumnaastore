Step to install node service 
----------------------------

1. nssm install "ServiceName" <node path>\node.exe <workingdir>\www net start "ServiceName"

export database
---------------
mysqldump -u [uname] -p[pass] db_name > db_backup.sql


import database
---------------
mysql -u username -p -h localhost DATA-BASE-NAME < data.sql