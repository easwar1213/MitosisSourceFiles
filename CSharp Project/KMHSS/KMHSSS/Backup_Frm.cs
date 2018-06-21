using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace KMHSSS
{
    public partial class Backup_Frm : Form
    {
        SqlConnection con;
        SqlCommand com;
        SqlDataReader rea;
        String conn;
        String str;
        public Backup_Frm()
        {
            InitializeComponent();
        }

        private void Backup_Frm_Load(object sender, EventArgs e)
        {
            Disconnect_but.Enabled = false ;
            loca_text.Enabled = false;
            Browse1_but.Enabled = false;
            BackUp_but.Enabled = false;
            restore_text.Enabled = false;
            Browse2_but.Enabled = false;
            restore_but.Enabled = false;
        }       

        private void Browse1_but_Click(object sender, EventArgs e)
        {
            //System.Diagnostics.Process.Start("explorer.exe", @"C:\Program Files\Microsoft SQL Server\MSSQL.1\MSSQL\Backup");
            FolderBrowserDialog dlg = new FolderBrowserDialog();
            if (dlg.ShowDialog() == DialogResult.OK)
            {
                loca_text.Text = dlg.SelectedPath;
            }
            BackUp_but.Enabled = true;
        }

        private void BackUp_but_Click(object sender, EventArgs e)
        {

            if (database_comba.Text.CompareTo("") == 0)
            {
                MessageBox.Show("Select Database");
                return;
            }
            try
            {
                con = new SqlConnection(conn);
                con.Open();
                String stri = "BACKUP DATABASE[" + database_comba.Text + "]TO DISK = '" + loca_text.Text + "\\" + database_comba.Text + "-" + DateTime.Now.Ticks.ToString() + ".bak'";
                //String stri = "BACKUP DATABASE[" + database_comba.Text + "]TO DISK = '" + loca_text.Text + "\\"  + database_comba.Text + "-" + DateTime.Now.Ticks.ToString() + ".bak' WITH NOFORMAT, NOINIT,NAME ='"+textBox3 .Text +"',SKIP, NOREWIND, NOUNLOAD,  STATS = 10";
                com = new SqlCommand(stri, con);
                com.ExecuteNonQuery();
                loca_text.Text = "";
                MessageBox.Show("Successfully Backup");
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }
            restore_text.Enabled = true;
            Browse2_but.Enabled = true;
        }

        private void Browse2_but_Click(object sender, EventArgs e)
        {
            OpenFileDialog dlg = new OpenFileDialog();
            dlg.Filter = "Backup Files(*.bak)|*.bak|All Files(*.*)|*.*";
            dlg.FilterIndex = 0;
            if (dlg.ShowDialog() == DialogResult.OK)
            {
                restore_text.Text = dlg.FileName;
            }            
            restore_but.Enabled = true;
        }

        private void Disconnect_but_Click(object sender, EventArgs e)
        {
            butt_connect.Enabled = false;
            dbname_text.Enabled = true;
            BackUp_but.Enabled = false;
            restore_but.Enabled = false;
            database_comba.Enabled = false;
        }

        private void restore_but_Click(object sender, EventArgs e)
        {
            if (database_comba.Text.CompareTo("") == 0)
            {
                MessageBox.Show("Select Database");
                return;
            }
            try
            {
                con = new SqlConnection(conn);
                con.Open();
                String stri = "RESTORE DATABASE[" + database_comba.Text + "]FROM DISK='" + restore_text.Text + "' WITH REPLACE;";

                com = new SqlCommand(stri, con);
                com.ExecuteNonQuery();                
                MessageBox.Show("Successfully Restored");
                restore_text.Text = "";
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }
        }

        private void dbname_text_KeyDown(object sender, KeyEventArgs e)
        {
            if (dbname_text.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    butt_connect.Focus();
                }
            }
        }

        private void database_comba_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                Browse1_but.Focus();
            }
        }

        private void loca_text_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                Browse1_but.Focus();
            }
        }

        private void restore_text_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                Browse2_but.Focus();
            }
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void butt_connect_Click(object sender, EventArgs e)
        {
            try
            {
                //(@"Data Source=DASS-PC\SQLEXPRESS;Integrated Security=True");
                conn = (@"Data Source='" + dbname_text.Text + "';Integrated Security=True;User Id='" + restore_text.Text + "';Password='" + loca_text.Text + "'");
                con = new SqlConnection(conn);
                con.Open();
                //str="EXEC sp_databases";
                str = "SELECT * FROM sys.databases d WHERE d.database_id > 4";
                com = new SqlCommand(str, con);
                rea = com.ExecuteReader();
                MessageBox.Show("Connected Successfully");
                database_comba.Items.Clear();
                while (rea.Read())
                {
                    database_comba.Items.Add(rea[0].ToString());
                }
                Disconnect_but.Enabled = true;
                loca_text.Enabled = true;
                Browse1_but.Enabled = true;
                restore_text.Enabled = true;
                Browse2_but.Enabled = true;
                database_comba.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message);
            }                    
             
        }
    }
}
