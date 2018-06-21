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
    public partial class Student_Contact_Details_Frm : Form
    {
        string query, strcdid;
        int last = 0;
        SqlConnection con = new SqlConnection(@"Data Source=.\SQLEXPRESS;Initial Catalog=DBKMHSS;Integrated Security=True");
        public Student_Contact_Details_Frm()
        {
            InitializeComponent();
        }

        private void Student_Contact_Details_Frm_Load(object sender, EventArgs e)
        {
            try
            {
                fill_Class_CBox();
                fill_AYear_CBox();
                Auto_Num();
                Fill_Grid();
                CD_Date_Dtp.Value = DateTime.Now;
                Delete_Btn.Enabled = false;
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Class_CBox()
        {
            try
            {
                Class_CBox.Items.Clear();
                query = "select Class from Class_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Class_CBox.Items.Add(dr["Class"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_Section_CBox()
        {
            try
            {
                Sec_CBox.Items.Clear();
                query = "select Section from Section_Master_Table where Class='" + Class_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Sec_CBox.Items.Add(dr["Section"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void fill_AYear_CBox()
        {
            try
            {
                SYear_CBox.Items.Clear();
                query = "select SYear from Academy_Year_Master_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    SYear_CBox.Items.Add(dr["SYear"].ToString());
                }
                con.Close();
                last = SYear_CBox.Items.Count - 1;
                SYear_CBox.SelectedIndex = last;
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
                SqlCommand cmd = new SqlCommand("select CD_Id from Student_Contact_Details_Table", con);
                String CD_Id = "CDID";
                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.HasRows)
                {
                    while (dr.Read())
                    {
                        CD_Id = dr[0].ToString();
                        CD_Id = CD_Id.Replace("CDID", "");
                        int no = Convert.ToInt32(CD_Id);
                        no++;
                        CD_Id = "CDID" + no.ToString();
                    }
                }
                else
                {
                    CD_Id = "CDID101";
                }
                CD_Id_Txt.Text = CD_Id;
                dr.Close();
                con.Close();
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
                query = "select * from Student_Contact_Details_Table";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);
                con.Close();
                Student_Contact_Details_dataGridView1.DataSource = dt;
                Student_Contact_Details_dataGridView1.Columns[0].HeaderText = "CD Id";
                Student_Contact_Details_dataGridView1.Columns[1].HeaderText = "CD Date";
                Student_Contact_Details_dataGridView1.Columns[2].HeaderText = "SYear";
                Student_Contact_Details_dataGridView1.Columns[3].HeaderText = "EYear";
                Student_Contact_Details_dataGridView1.Columns[4].HeaderText = "Class";
                Student_Contact_Details_dataGridView1.Columns[5].HeaderText = "Section";
                Student_Contact_Details_dataGridView1.Columns[6].HeaderText = "Std Name";
                Student_Contact_Details_dataGridView1.Columns[7].HeaderText = "Admis No";
                Student_Contact_Details_dataGridView1.Columns[8].HeaderText = "Address";
                Student_Contact_Details_dataGridView1.Columns[9].HeaderText = "Pincode";
                Student_Contact_Details_dataGridView1.Columns[10].HeaderText = "Father Mob";
                Student_Contact_Details_dataGridView1.Columns[11].HeaderText = "Mother Mob";
                Student_Contact_Details_dataGridView1.Columns[12].HeaderText = "Email Id";
                Student_Contact_Details_dataGridView1.Columns[0].Width = 100;
                Student_Contact_Details_dataGridView1.Columns[1].Width = 100;
                Student_Contact_Details_dataGridView1.Columns[2].Width = 120;
                Student_Contact_Details_dataGridView1.Columns[3].Width = 120;
                Student_Contact_Details_dataGridView1.Columns[4].Width = 120;
                Student_Contact_Details_dataGridView1.Columns[5].Width = 120;
                Student_Contact_Details_dataGridView1.Columns[6].Width = 130;
                Student_Contact_Details_dataGridView1.Columns[7].Width = 120;
                Student_Contact_Details_dataGridView1.Columns[8].Width = 130;
                Student_Contact_Details_dataGridView1.Columns[9].Width = 130;
                Student_Contact_Details_dataGridView1.Columns[10].Width = 120;
                Student_Contact_Details_dataGridView1.Columns[11].Width = 130;
                Student_Contact_Details_dataGridView1.Columns[12].Width = 130;
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
                CD_Id_Txt.Text = "";
                CD_Date_Dtp.Text = "";                
                SYear_CBox.Text = "";
                EYear_Txt.Text = "";
                Class_CBox.Text = "";
                Sec_CBox.Text = "";
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                Address_Txt.Text = "";
                Pincode_Txt.Text = "";
                Father_Mob_Txt.Text = "";
                Mother_Mob_Txt.Text = "";
                Email_Id_Txt.Text = "";
                SYear_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Add()
        {
            if (CD_Id_Txt.Text != "" && CD_Date_Dtp.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Student_Name_CBox.Text != "" && Admis_No_Txt.Text != "" && Address_Txt.Text != "" && Pincode_Txt.Text!="" && Father_Mob_Txt.Text!="" && Mother_Mob_Txt.Text!="")
            {
                try
                {
                    query = "Select * From Student_Contact_Details_Table Where Class='" + Class_CBox.Text.ToString().Trim() + "' and SYear='" + SYear_CBox.Text.ToString().Trim() + "' and EYear='" + EYear_Txt.Text.ToString().Trim() + "' and Admission_No='" + Admis_No_Txt.Text.ToString().Trim() + "'";
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
                        query = "insert into Student_Contact_Details_Table values('" + CD_Id_Txt.Text.Trim() + "','" + CD_Date_Dtp.Text.Trim() + "','" + SYear_CBox.Text.Trim() + "','" + EYear_Txt.Text.Trim() + "','" + Class_CBox.Text.Trim() + "','" + Sec_CBox.Text.Trim() + "','" + Student_Name_CBox.Text.Trim() + "','" + Admis_No_Txt.Text.Trim() + "','" + Address_Txt.Text.Trim() + "','"+Pincode_Txt.Text.Trim()+"','"+Father_Mob_Txt.Text.Trim()+"','"+Mother_Mob_Txt.Text.Trim()+"','"+Email_Id_Txt.Text.Trim()+"')";
                        cmd = new SqlCommand(query, con);
                        cmd.ExecuteNonQuery();
                        MessageBox.Show("Inserted Successfully");
                    }
                    con.Close();
                    cmd.Cancel();
                    Fill_Grid();
                    Clear_Controls();
                    Auto_Num();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Fill All the Fields!!!");
            }
        }

        public void Updat()
        {
            if (CD_Id_Txt.Text != "" && CD_Date_Dtp.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Student_Name_CBox.Text != "" && Admis_No_Txt.Text != "" && Address_Txt.Text != "" && Pincode_Txt.Text != "" && Father_Mob_Txt.Text != "" && Mother_Mob_Txt.Text != "")
            {
                try
                {
                    query = "update Student_Contact_Details_Table set SYear='" + SYear_CBox.Text.Trim() + "',EYear='" + EYear_Txt.Text.Trim() + "',Class='" + Class_CBox.Text.Trim() + "',Section='" + Sec_CBox.Text.Trim() + "',Std_Name='" + Student_Name_CBox.Text + "',Admission_No='" + Admis_No_Txt.Text.Trim() + "',Address='" + Address_Txt.Text.Trim() + "',Pincode='"+Pincode_Txt.Text.Trim()+"',Father_Mob='"+Father_Mob_Txt.Text.Trim()+"',Mother_Mob='"+Mother_Mob_Txt.Text.Trim()+"',Email_Id='"+Email_Id_Txt.Text.Trim()+"' where CD_Id='" + CD_Id_Txt.Text.Trim() + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Updated Successfully");
                    con.Close();
                    Clear_Controls();
                    Auto_Num();
                    Fill_Grid();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Fill All the Fields!!!");
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

        private void View_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Fill_Grid();
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
            if (CD_Id_Txt.Text != "" && CD_Date_Dtp.Text != "" && SYear_CBox.Text != "" && EYear_Txt.Text != "" && Class_CBox.Text != "" && Sec_CBox.Text != "" && Student_Name_CBox.Text != "" && Admis_No_Txt.Text != "" && Address_Txt.Text != "" && Pincode_Txt.Text != "" && Father_Mob_Txt.Text != "" && Mother_Mob_Txt.Text != "")
            {
                try
                {
                    query = "delete Student_Contact_Details_Table where CD_Id='" + CD_Id_Txt.Text + "'";
                    SqlCommand cmd = new SqlCommand(query, con);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    MessageBox.Show("Deleted Successfully");
                    con.Close();
                    Clear_Controls();
                    Auto_Num();
                    Fill_Grid();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Please Fill All the Fields!!!");
            }    
        }

        private void Clear_Btn_Click(object sender, EventArgs e)
        {
            try
            {
                Clear_Controls();
                Auto_Num();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
      
        private void Class_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                fill_Section_CBox();
                Fill_Std_Name();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }    
        }

        private void Sec_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            Fill_Std_Name();
        }

        private void Student_Name_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select Admission_No from Student_Admission_Master_Table where Std_Name='" + Student_Name_CBox.Text + "' and Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Admis_No_Txt.Text = dr["Admission_No"].ToString();
                }
                dr.Close();
                con.Close();
                Fill_Grid();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Fill_Std_Name()
        {
            try
            {
                Student_Name_CBox.Items.Clear();
                Student_Name_CBox.Text = "";
                Admis_No_Txt.Text = "";
                query = "select Std_Name from Student_Admission_Master_Table where Class='" + Class_CBox.Text + "' and Section='" + Sec_CBox.Text + "' and SYear='" + SYear_CBox.Text + "' and EYear='" + EYear_Txt.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Student_Name_CBox.Items.Add(dr["Std_Name"].ToString());
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }     
              

        private void SYear_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (SYear_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Class_CBox.Focus();
                }
            }
        }
      
        private void Class_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Class_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Sec_CBox.Focus();
                }
            }
        }

        private void Sec_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Sec_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Student_Name_CBox.Focus();
                }
            }
        }

        private void Student_Name_CBox_KeyDown(object sender, KeyEventArgs e)
        {
            if (Student_Name_CBox.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Address_Txt.Focus();
                }
            }
        }       

        private void Pincode_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Pincode_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Father_Mob_Txt.Focus();
                }
            }
        }

        private void Father_Mob_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Father_Mob_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Mother_Mob_Txt.Focus();
                }
            }
        }

        private void Mother_Mob_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (Mother_Mob_Txt.Text != "")
            {
                if (e.KeyCode == Keys.Enter)
                {
                    Email_Id_Txt.Focus();
                }
            }
        }

        private void Student_Contact_Details_dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                strcdid = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                CD_Id_Txt.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[0].Value.ToString();
                CD_Date_Dtp.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[1].Value.ToString();
                SYear_CBox.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[2].Value.ToString();
                EYear_Txt.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[3].Value.ToString();
                Class_CBox.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[4].Value.ToString();
                Sec_CBox.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[5].Value.ToString();
                Student_Name_CBox.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[6].Value.ToString();
                Admis_No_Txt.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[7].Value.ToString();
                Address_Txt.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[8].Value.ToString();
                Pincode_Txt.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[9].Value.ToString();
                Father_Mob_Txt.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[10].Value.ToString();
                Mother_Mob_Txt.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[11].Value.ToString();
                Email_Id_Txt.Text = Student_Contact_Details_dataGridView1.Rows[e.RowIndex].Cells[12].Value.ToString();
                Delete_Btn.Enabled = true;
                Class_CBox.Focus();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void Email_Id_Txt_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    if (Delete_Btn.Enabled == true)
                    {
                        Updat();
                    }
                    else
                    {
                        Add();
                    }
                    SYear_CBox.Focus();
                    Fill_Grid();
                }
                catch (Exception Ex)
                {
                    MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
        }

        private void SYear_CBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                query = "select EYear from Academy_Year_Master_Table where SYear='" + SYear_CBox.Text + "'";
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    EYear_Txt.Text = dr["EYear"].ToString().Trim();
                }
                con.Close();
            }
            catch (Exception Ex)
            {
                MessageBox.Show(Ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            Fill_Std_Name();
        }

        private void Pincode_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;

            }
            else
            {
                e.Handled = true;
            }
        }

        private void Father_Mob_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;

            }
            else
            {
                e.Handled = true;
            }
        }

        private void Mother_Mob_Txt_KeyPress(object sender, KeyPressEventArgs e)
        {
            char ch = e.KeyChar;
            if (!char.IsLetter(ch) && ch != 9 && ch.ToString() != "." && ch.ToString() != "," && ch.ToString() != "-" && ch.ToString() != "+" && ch.ToString() != "/" && ch.ToString() != "*" && ch.ToString() != "=" && ch.ToString() != "&" && ch.ToString() != "!" && ch.ToString() != "@" && ch.ToString() != "#" && ch.ToString() != "$" && ch.ToString() != "%" && ch.ToString() != "^" && ch.ToString() != "(" && ch.ToString() != ")" && ch.ToString() != "_" && ch.ToString() != "?" && ch.ToString() != "<" && ch.ToString() != ">" && ch.ToString() != ";" && ch.ToString() != ":" && ch.ToString() != "[" && ch.ToString() != "]" && ch.ToString() != "{" && ch.ToString() != "}" && ch.ToString() != "|")
            {
                e.Handled = false;

            }
            else
            {
                e.Handled = true;
            }
        }

        private void Close_Btn_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
