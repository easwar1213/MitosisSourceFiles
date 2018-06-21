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
    public partial class Login_Account_Master_Frm : Form
    {
        string query,query1,strlogid;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Login_Account_Master_Frm()
        {
            InitializeComponent();
        }

        private void Login_Account_Master_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                Alert_Msg_Lbl.Visible = false;
                Auto_Num();
                Fill_Grid();
                Name_Txt.Focus();
                LOG_Date_Dtp.Value = DateTime.Now;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }       

        public void Auto_Num()
        {
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("select LOG_Id from Login_Account_Master_Table", con);
                String LOG_Id = "LOGID";
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        LOG_Id = dr[0].ToString();
                        LOG_Id = LOG_Id.Replace("LOGID", "");
                        int no = Convert.ToInt32(LOG_Id);
                        no++;
                        LOG_Id = "LOGID" + no.ToString();
                    }
                }
                else
                {
                    LOG_Id = "LOGID101";
                }
                LOG_Id_Txt.Text = LOG_Id;
                dr.Close();
                con.Close();
                Name_Txt.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Grid()
        {
            try
            {
                query = "select * from Login_Account_Master_Table order by LOG_ID desc";          
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Login_Account_Master_dataGridView1.DataSource = dt;
                Login_Account_Master_dataGridView1.Columns[0].HeaderText = "LOG Id";
                Login_Account_Master_dataGridView1.Columns[1].HeaderText = "LOG Date";
                Login_Account_Master_dataGridView1.Columns[2].HeaderText = "Name";
                Login_Account_Master_dataGridView1.Columns[3].HeaderText = "Login Type";
                Login_Account_Master_dataGridView1.Columns[4].HeaderText = "Place";
                Login_Account_Master_dataGridView1.Columns[5].HeaderText = "User Name";
                Login_Account_Master_dataGridView1.Columns[6].HeaderText = "Password";
                Login_Account_Master_dataGridView1.Columns[7].HeaderText = "Mobile No";
                Login_Account_Master_dataGridView1.Columns[8].HeaderText = "Email Id";
                Login_Account_Master_dataGridView1.Columns[0].Width = 100;
                Login_Account_Master_dataGridView1.Columns[1].Width = 120;
                Login_Account_Master_dataGridView1.Columns[2].Width = 120;
                Login_Account_Master_dataGridView1.Columns[3].Width = 120;
                Login_Account_Master_dataGridView1.Columns[4].Width = 120;
                Login_Account_Master_dataGridView1.Columns[5].Width = 130;
                Login_Account_Master_dataGridView1.Columns[6].Width = 120;
                Login_Account_Master_dataGridView1.Columns[7].Width = 130;
                Login_Account_Master_dataGridView1.Columns[8].Width = 200;
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Clear_Controls()
        {
            try
            {
                LOG_Id_Txt.Text = "";
                LOG_Date_Dtp.Text = "";
                Name_Txt.Text = "";
                Login_Type_CBox.Text = "";
                Place_Txt.Text = "";
                User_Name_Txt.Text = "";
                Password_Txt.Text = "";
                Mobile_No_Txt.Text = "";
                Email_Id_Txt.Text = "";
                Auto_Num();
                Name_Txt.Focus();
                Update_Btn.Enabled = false;
                Delete_Btn.Enabled = false;
                Save_Btn.Enabled = true;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Add()
        {
            if (LOG_Id_Txt.Text != "" && LOG_Date_Dtp.Text != "" && Name_Txt.Text != "" && Login_Type_CBox.Text != "" && Place_Txt.Text != "" && User_Name_Txt.Text != "" && Password_Txt.Text != "" && Mobile_No_Txt.Text != "" && Email_Id_Txt.Text!="")
            {
                try
                {
                    query = "Select * From Login_Account_Master_Table Where Name='" + Name_Txt.Text.ToString().Trim() + "' and Login_Type='" + Login_Type_CBox.Text.ToString().Trim() + "' and User_Name='"+User_Name_Txt.Text.ToString().Trim()+"' and Password='" + Password_Txt.Text.ToString().Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        MessageBox.Show("Already Exist");
                    }
                    else
                    {
                        dr.Close();
                        query = "insert into Login_Account_Master_Table values('" + LOG_Id_Txt.Text.Trim() + "','" + LOG_Date_Dtp.Text.Trim() + "','" + Name_Txt.Text.Trim() + "','" + Login_Type_CBox.Text.Trim() + "','" + Place_Txt.Text.Trim() + "','" + User_Name_Txt.Text.Trim() + "','" + Password_Txt.Text.Trim() + "','" + Mobile_No_Txt.Text.Trim() + "','"+Email_Id_Txt.Text.Trim() +"')";
                        query1 = "insert into Login_Table values('" + User_Name_Txt.Text.Trim() + "','" + Password_Txt.Text.Trim() + "','" + Login_Type_CBox.Text.Trim() + "','" + Mobile_No_Txt.Text.Trim() + "','" + Email_Id_Txt.Text.Trim() + "','" + LOG_Id_Txt.Text.Trim() + "')";
                        cmd = new SqlCommand(query, con);
                        SqlCommand cmd1 = new SqlCommand(query1, con);
                        if (cmd1.ExecuteNonQuery() > 0)
                        {
                            cmd.ExecuteNonQuery();
                            Alert_Msg_Lbl.Visible = true;
                            Alert_Msg_Lbl.Text = "Inserted Successfully";
                        }
                    }
                    con.Close();
                    cmd.Cancel();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Updat()
        {
            if (LOG_Id_Txt.Text != "" && LOG_Date_Dtp.Text != "" && Name_Txt.Text != "" && Login_Type_CBox.Text != "" && Place_Txt.Text != "" && User_Name_Txt.Text != "" && Password_Txt.Text != "" && Mobile_No_Txt.Text != "" && Email_Id_Txt.Text != "")
            {
                try
                {
                    query = "update Login_Account_Master_Table set Name='" + Name_Txt.Text.Trim() + "',Login_Type='" + Login_Type_CBox.Text + "',Place='" + Place_Txt.Text.Trim() + "',User_Name='" + User_Name_Txt.Text.Trim() + "',Password='" + Password_Txt.Text.Trim() + "',Mobile_No='" + Mobile_No_Txt.Text.Trim() + "',Email_Id='"+Email_Id_Txt.Text.Trim() +"' where LOG_Id='" + LOG_Id_Txt.Text.Trim() + "'";
                    query1 = "update Login_Table set User_Name='" + User_Name_Txt.Text.Trim() + "',Password='" + Password_Txt.Text.Trim() + "',Login_Type='" + Login_Type_CBox.Text.Trim() + "',Mobile_No='" + Mobile_No_Txt.Text.Trim() + "',Email_Id='" + Email_Id_Txt.Text.Trim() + "'where LOG_Id='" + LOG_Id_Txt.Text.Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    SqlCommand cmd1 = new SqlCommand(query1, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    cmd1.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Updated Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        public void Del()
        {
            if (LOG_Id_Txt.Text != "" && LOG_Date_Dtp.Text != "" && Name_Txt.Text != "" && Login_Type_CBox.Text != "" && Place_Txt.Text != "" && User_Name_Txt.Text != "" && Password_Txt.Text != "" && Mobile_No_Txt.Text != "" && Email_Id_Txt.Text != "")
            {
                try
                {
                    query = "delete Login_Account_Master_Table where LOG_Id='" + LOG_Id_Txt.Text + "'";
                    query1 = "delete Login_Table where LOG_Id='" + LOG_Id_Txt.Text + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    SqlCommand cmd1 = new SqlCommand(query1, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    cmd1.ExecuteNonQuery();
                    Alert_Msg_Lbl.Visible = true;
                    Alert_Msg_Lbl.Text = "Deleted Successfully";
                    con.Close();
                    Fill_Grid();
                    Clear_Controls();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }  
        }
       
        private void Email_Id_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    if (Email_Id_Txt.Text!= "")
                    {
                        if (Delete_Btn.Enabled == true)
                        {
                            Updat();
                        }
                        else
                        {
                            Add();
                        }
                        Name_Txt.Focus();
                        Fill_Grid();
                    }
                    else
                    {
                        Alert_Msg_Lbl.Visible = true;
                        Alert_Msg_Lbl.Text = "Please Fill All the Fields";
                    }
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void Name_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Name_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Login_Type_CBox.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }      

        private void Place_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Place_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    User_Name_Txt.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }       

        private void Mobile_No_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Mobile_No_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Email_Id_Txt.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Enter Numbers Only";
            }
        }

        private void Login_Account_Master_dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                strlogid = Login_Account_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                LOG_Id_Txt.Text = Login_Account_Master_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                LOG_Date_Dtp.Text = Login_Account_Master_dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                Name_Txt.Text = Login_Account_Master_dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                Login_Type_CBox.Text = Login_Account_Master_dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                Place_Txt.Text = Login_Account_Master_dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
                User_Name_Txt.Text = Login_Account_Master_dataGridView1.Rows[e.RowIndex].Cells[5].Value.ToString();
                Password_Txt.Text = Login_Account_Master_dataGridView1.Rows[e.RowIndex].Cells[6].Value.ToString();
                Mobile_No_Txt.Text = Login_Account_Master_dataGridView1.Rows[e.RowIndex].Cells[7].Value.ToString();
                Email_Id_Txt.Text = Login_Account_Master_dataGridView1.Rows[e.RowIndex].Cells[8].Value.ToString();
                Update_Btn.Enabled = true;
                Delete_Btn.Enabled = true;
                Clear_Btn.Enabled = true;
                Name_Txt.Focus();      
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Login_Type_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Login_Type_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Place_Txt.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void User_Name_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (User_Name_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Password_Txt.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Password_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Password_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Mobile_No_Txt.Focus();
                }
            }
            else
            {
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Fill All the Fields";
            }
        }

        private void Save_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Add();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Update_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Updat();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Delete_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Delete", "Delete", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Del();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Clear_Btn_Click(object sender, EventArgs e)
        {
            DialogResult res = MessageBox.Show("Do You Want to Clear", "Clear", MessageBoxButtons.OKCancel, MessageBoxIcon.Information);
            if (res.Equals(DialogResult.OK))
            {
                try
                {
                    Clear_Controls();
                    Alert_Msg_Lbl.Text = "";
                    Alert_Msg_Lbl.Visible = false;
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Check the Details!!!");
            }  
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {

            try
            {
                this.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Mobile_No_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;
                Alert_Msg_Lbl.Visible = true;
                Alert_Msg_Lbl.Text = "Please Enter Numbers Only";
            }
            else
            {
                e.Handled = true;
            }
        }       
       
    }
}
